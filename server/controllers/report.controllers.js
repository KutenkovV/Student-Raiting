const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const sequelize = require("../db");

class ReportController {
  async getAll(req, res) {
    // объект JavaScript
    var result = [
      {
        title: "НИД",
        totalSubmitted: (
          await ReportController.getTotalSubmitted("НИД")
        ).toString(),
        count: (await ReportController.getСount("НИД")).toString(),
        borderPoint: "ывапролдлорпа",
        nextPoint: "",
      },
      {
        title: "УД",
        totalSubmitted: (
          await ReportController.getTotalSubmitted("УД")
        ).toString(),
        count: (await ReportController.getСount("УД")).toString(),
        borderPoint: "",
        nextPoint: "",
      },
      {
        title: "СД",
        totalSubmitted: (
          await ReportController.getTotalSubmitted("СД")
        ).toString(),
        count: (await ReportController.getСount("СД")).toString(),
        borderPoint: "",
        nextPoint: "",
      },
      {
        title: "ОД",
        totalSubmitted: (
          await ReportController.getTotalSubmitted("ОД")
        ).toString(),
        count: (await ReportController.getСount("ОД")).toString(),
        borderPoint: "",
        nextPoint: "",
      },
      {
        title: "КТД",
        totalSubmitted: (
          await ReportController.getTotalSubmitted("КТД")
        ).toString(),
        count: (await ReportController.getСount("КТД")).toString(),
        borderPoint: "",
        nextPoint: "",
      },
    ];

    //return res.json(JSON.strigify(result));
    return res.json(result);
  }

  static async getTotalSubmitted(title) {
    const totalSubmitted = await models.StudentsRating.count({
      required: true,

      include: [
        {
          model: models.Rating,
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
    console.log(totalSubmitted);
    return totalSubmitted;
  }
  static async getСount(title) {
    const totalSubmitted = await models.RatingCount.findAll({
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
                //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
              ],
            },
          },
        },
      ],
    });
    //console.log(totalSubmitted[0]);
    //console.log(totalSubmitted[0].dataValues.count);
    return totalSubmitted[0].dataValues.count;
  }
  static async getNextPoint() {
    const totalSubmitted = await models.StudentsRating.findAll({
      required: true,
      include: [
        {
          model: models.Students,
          attributes: ["studnumber", "fullname", "sad"],
        },
      ],
    });
    return totalSubmitted;
  }

  static async getBorderPoint() {
    const totalSubmitted = await models.StudentsRating.findAll({
      required: true,
      include: [
        {
          model: models.Students,
          attributes: ["studnumber", "fullname", "sad"],
        },
      ],
    });
    return totalSubmitted;
  }
}
module.exports = new ReportController();
