const models = require("../models/models");

const { Op } = require("sequelize");

//класс,

class ListController {
  //
  async getWithOrder(title) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination","cause"],
      order: [
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
  //
  async get(title) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
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

    //цикл на начисление стипендии если после последнего прошедшего стоят люди с таким же количеством
    for (let i = 0; i < result.length; i++) {
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
  //
  async getSad(req, res) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
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
          required: true,
          where: { sad: "true" },
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
    for (let i = 0; i < result.length; i++) {
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
    return res.json(result);
  }
  //
  async getVacation(req, res) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
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
          required: true,
          where: { vacation: "true" },
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
    for (let i = 0; i < result.length; i++) {
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
    return res.json(result);
  }
  //
  async getFree(req, res) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
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
          required: true,
          where: { free: "true" },
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
    for (let i = 0; i < result.length; i++) {
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
    return res.json(result);
  }
  //
  async getFinal(req, res) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination","cause"],
      order: [
        [
          models.Rating,
          models.RatingCourses,
          { model: models.Courses },
          "id",
          "ASC",
        ],
        
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
    //console.log(result)
    return res.json(result);
  }
}
module.exports = new ListController();
