const models = require("../models/models");

const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class CalculateRatingController {

  //метод расчета рейтинговой стипендии
  async calculation(req, res) {
    //чистим у всех поле получения стипендии и причину неполучения
    await CalculateRatingController.deleteCourse();

    await CalculateRatingController.calculationCourse("НИД");
    await CalculateRatingController.calculationCourse("УД");
    await CalculateRatingController.calculationCourse("СД");
    await CalculateRatingController.calculationCourse("ОД");
    await CalculateRatingController.calculationCourse("КТД");
  }
  //метод очистки полей
  static async deleteCourse() {
    //получаем список всех заявок студентов текущего периода
    const list = await models.StudentsRating.findAll({
      attributes: ["id", "destination","cause"],
      required: true,
      include: [
        {
          model: models.DateTable,
          attributes: ["id", "date"],
          required: true,
          where: {
            date: {
              [Op.contains]: [
                { value: new Date(), inclusive: true },
                { value: new Date(), inclusive: true },
              ],
            },
          },
        },
      ],
    });
    //ставим значения destination: false, cause: null
    for (let i = 0; i < list.length; i++) {
      await models.StudentsRating.update(
        { destination: false, cause: null  },
        {
          where: {
            id: list[i].dataValues.id,
          },
        }
      );
    }
  }

  static async calculationCourse(title) {
    //ищу количество мест по заданному направлению
    const counts = await models.RatingCount.findAll({
      required: true,
      attributes: ["count"],
      include: [
        {
          model: models.Courses,
          where: {
            title: title,
          },
        },
        {
          model: models.DateTable,
          attributes: ["id", "date"],
          required: true,
          where: {
            date: {
              [Op.contains]: [
                { value: new Date(), inclusive: true },
                { value: new Date(), inclusive: true },
              ],
            },
          },
        },
      ],
    });

    //получаю первое количество мест
    const count = counts[0].dataValues.count;
    //список студентов по заданному направлению
    const list = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
      order: [
        [models.Students, "sad", "DESC NULLS LAST"],
        [models.Rating, "points", "DESC"],
      ],
      required: true,
      include: [
        {
          model: models.Students,
          attributes: [
            "studnumber",
            "fullname",
            "educationgroup",
            "institute",
            "sad",
          ],
        },
        {
          model: models.Rating,
          attributes: ["points"],
          required: true,
          include: [
            {
              model: models.RatingCourses,
              required: true,
              include: [
                {
                  model: models.Courses,

                  where: {
                    title: title,
                  },
                },
                {
                  model: models.CourseLevels,
                  attributes: ["level"],
                },
              ],
            },
          ],
        },
        {
          model: models.DateTable,
          attributes: ["id", "date"],
          required: true,
          where: {
            date: {
              [Op.contains]: [
                { value: new Date(), inclusive: true },
                { value: new Date(), inclusive: true },
               
              ],
            },
          },
        },
      ],
    });

    //счетчик в который кладется последний балл прошедшего студента
    var c1 = 0;
    //счетчик на оставшиеся места
    var countRemained = count;

    //цикл на начисление стипендии по количеству мест
    for (let i = 0; i < list.length; i++) {
      //если студент получает ГАС
      if (list[i].student.dataValues.sad == true) {
        // если еще остались места, то назначить рейтинговую стипендию
        if (countRemained > 0) {
          await models.StudentsRating.update(
            { destination: true ,cause: null},
            {
              where: {
                id: list[i].dataValues.id,
              },
            }
          );
          //обновление последнего балла
          c1 = list[i].rating.dataValues.points;
          //уменьшение оставшихся мест
          countRemained--;
        }
        //иначе пишем не достаточно баллов
        else {
          await models.StudentsRating.update(
            { cause: "Не дост. баллов" },
            {
              where: {
                id: list[i].dataValues.id,
              },
            }
          );
        }
      }
      //иначе пишем нет академической стипендии
      else {
        await models.StudentsRating.update(
          { cause: "Нет академ. ст." },
          {
            where: {
              id: list[i].dataValues.id,
            },
          }
        );
      }
    }
    //цикл на начисление стипендии если после последнего прошедшего стоят люди с таким же количеством
    for (let i = 0; i < list.length; i++) {
      if (
        list[i].rating.dataValues.points == c1 &&
        list[i].student.dataValues.sad == true
      ) {
        await models.StudentsRating.update(
          { destination: true ,cause: null},
          {
            where: {
              id: list[i].dataValues.id,
            },
          }
        );
      }
    }
  }
}
module.exports = new CalculateRatingController();
