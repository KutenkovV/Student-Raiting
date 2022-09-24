const models = require("../models/models");
const { Op } = require("sequelize");

class CalculateRatingController {

  //метод расчета рейтинговой стипендии
  async calculation(req, res) {
    //чистим у всех поле получения стипендии и причину неполучения
    await CalculateRatingController.deleteCourse();

    //отметили всех без ГАС и со свободным графиком
    const listSadFalse = await models.StudentsRating.findAll({
      attributes: ["id"],
      required: true,
      include: [
        {
          model: models.Students,
          where:{
            sad:false
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
    for (let i = 0; i < listSadFalse.length; i++) {
      await models.StudentsRating.update(
        { destination:false ,cause: "Нет академ. ст." },
        {
          where: {
            id: listSadFalse[i].dataValues.id,
          },
        }
      );
    }

    //отметили всех со свободным графиком
    const listFreeTrue = await models.StudentsRating.findAll({
      attributes: ["id"],
      required: true,
      include: [
        {
          model: models.Students,
          where:{
            free:true
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
    for (let i = 0; i < listFreeTrue.length; i++) { 
      await models.StudentsRating.update(
        { destination:false ,cause: "Свободный график" },
        {
          where: {
            id: listFreeTrue[i].dataValues.id,
          },
        }
      );
    }


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
    let count = 0 ;
    if ( ! counts[0].dataValues.count) {
      res.status(400).send("Настройки не были загружены!");
      return;
    } else{
      //получаю первое количество мест
      count = counts[0].dataValues.count;
    }

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
          where:{
            sad:true,
            vacation:false,
            free:false
          },
          attributes: [
            "studnumber",
            "fullname",
            "educationgroup",
            "institute",
            "sad",
            "vacation",
            "free"
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
                //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
              ],
            },
          },
        },
      ],
    });

    //счетчик в который кладется послдений балл прошедшего студента
    var lastPoint = 0;
    //счетчик на оставшиеся места
    var countRemained = count;

    //цикл на начисление стипендии по количеству мест
    for (let i = 0; i < list.length; i++) {
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
          lastPoint = list[i].rating.dataValues.points;
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
    //цикл на начисление стипендии если после последнего прошедшего стоят люди с таким же количеством
    for (let i = 0; i < list.length; i++) {
      if (
        list[i].rating.dataValues.points == lastPoint
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

    await CalculateRatingController.updateVacation(title,lastPoint);

   
  }


  static async updateVacation(title,lastPoint) {
     //список студентов по заданному направлению
     const listVacation = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
      order: [
        [models.Students, "sad", "DESC NULLS LAST"],
        [models.Rating, "points", "DESC"],
      ],
      required: true,
      include: [
        {
          model: models.Students,
          where:{
            sad:true,
            vacation:true
          },
          attributes: [
            "studnumber",
            "fullname",
            "educationgroup",
            "institute",
            "sad",
            "vacation",
            "free"
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
                //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
              ],
            },
          },
        },
      ],
    });
    //цикл на начисление стипендии каникулярным
    for (let i = 0; i < listVacation.length; i++) {
      if (
        listVacation[i].rating.dataValues.points >= lastPoint
      ) {
        await models.StudentsRating.update(
          { destination: true ,cause: "Каникулы"},
          {
            where: {
              id: listVacation[i].dataValues.id,
            },
          }
        );
      }
      //иначе пишем не достаточно баллов
      else {
        await models.StudentsRating.update(
          { destination: false,cause: "Не дост. баллов" },
          {
            where: {
              id: listVacation[i].dataValues.id,
            },
          }
        );
      }
    }
  }
}
module.exports = new CalculateRatingController();
