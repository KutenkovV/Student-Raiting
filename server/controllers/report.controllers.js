const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require('sequelize');
const sequelize = require('../db')

class ReportController {
  async getAll(req, res) {
    
    

    /*const dateId = await models.DateTable.findAll({
        required: true,
        
            where: {
                'date': {
                    [Op.between]: [new Date(), new Date()]
                }
            },
            
    });*/

    // Init main query
    var query = "SELECT * FROM" + '"datetable"' +
    " WHERE "  + '"date"' + " @>"+" [ " +  new Date() +
    " ," + new Date()+"] ::daterange";


    global.db.sequelize.query(query)
    .then(function(calls) {
    console.log(calls);
    })
    .error(function (err) {
    console.log(err);
    });


    // объект JavaScript
    var result = [
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
      {
        title: "Иван",
        totalSubmitted: "",
        count: "",
        borderPoint: "",
        nextPoint: "",
      },
    ];

    //return res.json(JSON.strigify(result));
    return res.json(dateId);
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
