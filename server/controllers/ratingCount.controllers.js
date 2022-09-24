const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const calculateRatingController = require("./calculateRating.controllers");

//класс отвечающий за количество мест по направлениям

class RatingCountController {
  
  //метод возвращающий количество мест по направлениям
  async get(req, res) {
    const courseCount = await models.RatingCount.findAll({
      required: true,
      attributes: ["id", "count"],
      include: [
        {
          model: models.Courses,
          attributes: ["title"],
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

    return res.json(courseCount);
  }

  //метод изменения количества мест по направлениям
  async update(req, res) {
    if (!req.body) return response.sendStatus(400);

    await RatingCountController.updateCountCourse("НИД", parseInt(req.body.nidInput));
    await RatingCountController.updateCountCourse("УД", parseInt(req.body.udInput));
    await RatingCountController.updateCountCourse("СД", parseInt(req.body.sdInput));
    await RatingCountController.updateCountCourse("ОД", parseInt(req.body.odInput));
    await RatingCountController.updateCountCourse("КТД", parseInt(req.body.ktdInput));


    //после обновления количества мест нужно выполнить процедуру начисления рейтинговой стипендии заново
    calculateRatingController.calculation();
    res.send("ОК");
  }

  //метод изменения количества мест по одному направлению
  static async updateCountCourse(title, count) {
    //получаем id направления
    const course = await models.RatingCount.findOne({
      attributes: ["id"],
      include: [
        {
          model: models.Courses,
          where: {
            title: title,
          },
        },
        {
          model: models.DateTable,
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
    //изменяем количество мест
    await models.RatingCount.update(
      { count: parseInt(count) },
      {
        where: {
          id: course.id,
        },
      }
    );
  }

  //метод возвращающий 10% от количества студентов получающих ГАС
  async getCountFromSad(req, res) {
    const list = await models.StudentsSAD.findAll({
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
    return res.json(list.length * 0.1);
  }
}

module.exports = new RatingCountController();
