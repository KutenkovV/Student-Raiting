const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class StudentRatingManyCoursesController {
  async getAll(req, res) {
    const list = await models.Students.findAll({
      attributes: ["id"],
    });

    var result = [];

    //цикл на поиск людей с несколькими направлениями
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
              id: list[i].dataValues.id,
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

      if (listStudentRating.length > 1) {
        var stud = {
          studnumber: listStudentRating[0].student.dataValues.studnumber,
          fullname: listStudentRating[0].student.dataValues.fullname,
          educationgroup:
            listStudentRating[0].student.dataValues.educationgroup,
          institute: listStudentRating[0].student.dataValues.institute,
          sad: listStudentRating[0].student.dataValues.sad,
          nid: {
            point: 0,
            destination: false,
          },
          od: {
            point: 0,
            destination: false,
          },
          sd: {
            point: 0,
            destination: false,
          },
          ktd: {
            point: 0,
            destination: false,
          },
          ud: {
            point: 0,
            destination: false,
          },
        };

        for (let y = 0; y < listStudentRating.length; y++) {
          
          if (
            listStudentRating[y].rating.dataValues.ratingcourse.dataValues
              .course.dataValues.title == "HИД"
          ) {
            stud.nid.point = listStudentRating[y].rating.dataValues.points;
            stud.nid.destination = listStudentRating[y].destination;

          }
          if (
            listStudentRating[y].rating.dataValues.ratingcourse.dataValues
              .course.dataValues.title == "КТД"
          ) {
            stud.ktd.point = listStudentRating[y].rating.dataValues.points;
            stud.ktd.destination = listStudentRating[y].destination;
            
          }
          if (
            listStudentRating[y].rating.dataValues.ratingcourse.dataValues
              .course.dataValues.title == "ОД"
          ) {
            stud.od.point = listStudentRating[y].rating.dataValues.points;
            stud.od.destination = listStudentRating[y].destination;
          }
          if (
            listStudentRating[y].rating.dataValues.ratingcourse.dataValues
              .course.dataValues.title == "СД"
          ) {
            stud.sd.point = listStudentRating[y].rating.dataValues.points;
            stud.sd.destination = listStudentRating[y].destination;
          }
          if (
            listStudentRating[y].rating.dataValues.ratingcourse.dataValues
              .course.dataValues.title == "УД"
          ) {
            stud.ud.point = listStudentRating[y].rating.dataValues.points;
            stud.ud.destination = listStudentRating[y].destination;
          }
        }

        result.push(stud);
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
