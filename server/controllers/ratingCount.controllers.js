const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const calculateRatingController = require("./calculateRating.controllers");

class RatingCountController {
  async getAll(req, res) {
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
                //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
              ],
            },
          },
        },
      ],
    });

    return res.json(courseCount);
  }
  
  async update(req, res) {
    
    
    const { title, count } = req.body;
    const courses = await RatingCount.update(
      {
        count: count,
      },
      {
        include: [
          {
            model: models.Courses,
            attributes: ["title"],
          },
          {
            model: models.DateTable,
            //attributes: ['id','date'],
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
      },
      {
        where: {
          id: id,
        },
      }
    );

    ///////////ПОСЛЕ ОБНОВЛЕНИЯ НАДО ПЕРЕРАСЧИТЫВАТЬ МЕСТА И ПОЛУЧАЮЩИХ///////////////////////////////////////////////////////////////////////////////////////
    calculateRatingController.calculation();

    //console.log(JSON.stringify(courses, null, 2));
    return res.json(courses);
  }

}

module.exports = new RatingCountController();
