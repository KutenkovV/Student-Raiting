const models = require("../models/models");
const { Op } = require("sequelize");
const { Sequelize } = require("../db");

class ListController {
  
  static async getWithOrder(title) {
    let result = await models.StudentsRating.findAll({
      attributes: [
        "id",
        [Sequelize.literal('ROW_NUMBER() over (ORDER BY (select 0))'), 'rowNumber'],
        "destination",
        "cause",
      ],
      order: [
        
        [ "destination", "DESC"],
        [ models.Students,"free", "ASC"],
        [ models.Students,"sad", "DESC"],
        [ "cause", "DESC"],
        [models.Rating, "points", "DESC"],
        [
          models.Rating,
          models.RatingCourses,
          { model: models.CourseLevels },
          "level",
          "ASC",
        ],
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
            "vacation",
            "free",
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

    //console.log(typeof(result))
    //цикл на изменение true=>да, false=>нет
    for (let i = 0; i < result.length; i++) {
     // Object.assign(result[i].dataValues,  {"number": i+1} );
      if (
        result[i].student.dataValues.sad == true
      ) {
        result[i].student.dataValues.sad ="Да"
      }
      else {
        result[i].student.dataValues.sad ="Нет"
      }
      if (
        result[i].student.dataValues.vacation == true
      ) {
        result[i].student.dataValues.vacation ="Да"
      }
      else {
        result[i].student.dataValues.vacation ="Нет"
      }
      if (
        result[i].student.dataValues.free == true
      ) {
        result[i].student.dataValues.free ="Да"
      }
      else {
        result[i].student.dataValues.free ="Нет"
      }
    }

    return result;
  }

  async getKtd(req, res) {
    return res.json(await ListController.getWithOrder("КТД"));
  }
  
  async getNid(req, res) {
    return res.json(await ListController.getWithOrder("НИД"));
  }

  async getUd(req, res) {
    return res.json(await ListController.getWithOrder("УД"));
  }
  
  async getSd(req, res) {
    return res.json(await ListController.getWithOrder("СД"));
  }

  async getOd(req, res) {
    return res.json(await ListController.getWithOrder("ОД"));
  }
}
module.exports = new ListController();
