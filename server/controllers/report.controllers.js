const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require('sequelize');
const sequelize = require('../db')

class ReportController {
  async getAll(req, res) {
    
     
    // объект JavaScript
    var result = [
      {
        title: "Иван",
        totalSubmitted: "",
        count: "",
        borderPoint: "ывапролдлорпа",
        nextPoint: "",
      },
      {
        title: "Иван",
        totalSubmitted: "",
        count: "",
        borderPoint: "",
        nextPoint: "",
      },
      {
        title: "Иван",
        totalSubmitted: "",
        count: "",
        borderPoint: "",
        nextPoint: "",
      },
      {
        title: "Иван",
        totalSubmitted: "",
        count: "",
        borderPoint: "",
        nextPoint: "",
      },
      {
        title: "Иван",
        totalSubmitted: "",
        count: "",
        borderPoint: "",
        nextPoint: "",
      },
    ];


    const dateId = await models.DateTable.findAll({
      required: true,
      attributes: ["id"],
      where: {
              'date': {
                  [Op.contains]: [
                    { value: new Date(), inclusive: true },
                    { value: new Date(), inclusive: true }
                  ]
              }
          },
          
    });
    
    //return res.json(JSON.strigify(result));
    return res.json(result);
  }

  async getСount() {
    const totalSubmitted = await models.StudentsReating.findAll({
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

  async getNextPoint() {
    const totalSubmitted = await models.StudentsReating.findAll({
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

  async getBorderPoint() {
    const totalSubmitted = await models.StudentsReating.findAll({
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
  async getTotalSubmitted() {
    const totalSubmitted = await models.StudentsReating.findAll({
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
