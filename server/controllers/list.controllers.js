const models = require("../models/models");
const { Op } = require("sequelize");

class ListController {
  
  static async getWithOrder(title) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination","cause"],
      order: [
        [ "destination", "DESC"],
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
