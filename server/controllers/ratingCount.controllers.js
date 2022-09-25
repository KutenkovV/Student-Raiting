const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const calculateRatingController = require("./calculateRating.controllers");
const ModelService=require("../service/model.service");

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

    await ModelService.updateCountCourse("НИД", parseInt(req.body.nidInput));
    await ModelService.updateCountCourse("УД", parseInt(req.body.udInput));
    await ModelService.updateCountCourse("СД", parseInt(req.body.sdInput));
    await ModelService.updateCountCourse("ОД", parseInt(req.body.odInput));
    await ModelService.updateCountCourse("КТД", parseInt(req.body.ktdInput));


    //после обновления количества мест нужно выполнить процедуру начисления рейтинговой стипендии заново
    calculateRatingController.calculation();
    res.send("ОК");
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
