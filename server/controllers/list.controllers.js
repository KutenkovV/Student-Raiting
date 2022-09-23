const models = require("../models/models");
const { Op } = require("sequelize");

class ListController {


  static async getWithOrder(title) {

    function includeModel(model, params) {
      return { model, ...params }
    }

    //make some decomposition
    //rating decomposition

    const courses = [
      includeModel(models.Courses, {
        where: {
          title: title,
        }
      }),
      includeModel(models.CourseLevels, { attributes: ["level"] })
    ]


    const ratingCourses = [
      includeModel(models.RatingCourses, {
        required: true,

        include: courses,
      }),
    ]


    const students = [
      includeModel(models.Students, {
        attributes: [
          "studnumber",
          "fullname",
          "educationgroup",
          "institute",
          "sad",
          "vacation",
          "free",
        ],
      }),

      includeModel(models.Rating,
        {
          attributes: ["points"],
          required: true,

          include: ratingCourses
        }),

      includeModel(models.DateTable, {
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
      }),
    ]

    console.log(students[1])
    // const u =  await models.StudentsRating.
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination", "cause"],
      order: [
        ["destination", "DESC"],
        ["cause", "DESC"],
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

      include: students,
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
