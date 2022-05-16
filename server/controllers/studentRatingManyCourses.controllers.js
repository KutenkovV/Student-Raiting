const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");


class StudentRatingManyCoursesController {
  async getAll(req, res) {
    const list = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
      order: [
        [models.Students, "sad", "DESC NULLS LAST"],
        [models.Rating, "points", "DESC"],
      ],
      required: true,
      include: [
        {
          model: models.Students,
          attributes: [
            "id",
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
                //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
              ],
            },
          },
        },
      ],
    });

    var result = []
    
    //цикл на начисление стипендии если после последнего прошедшего стоят люди с таким же количеством
    for (let i = 0; i < list.length; i++) {
      
      const listStudentRating = await models.StudentsRating.findAll({
        attributes: ["id", "destination"],
        order: [
          [models.Students, "sad", "DESC NULLS LAST"],
          [models.Rating, "points", "DESC"],
        ],
        required: true,
        include: [
          {
            model: models.Students,
            where: {
              id: list[i].student.dataValues.id,
            },
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
                  //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                  //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
                ],
              },
            },
          },
        ],
      });
      
      if (
        listStudentRating.length> 1
      ) {
        result.push(...listStudentRating);
      }
    }

    return res.json(result);
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

module.exports = new StudentRatingManyCoursesController();
