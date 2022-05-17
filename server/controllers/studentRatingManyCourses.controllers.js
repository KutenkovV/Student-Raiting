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
      //получаю список заявок студента
      const listStudentRating = await models.StudentsRating.findAll({
        attributes: ["id", "destination"],
        include: [
          {
            model: models.Students,
            where: {
              id: list[i].dataValues.id,
            },
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
                    attributes: ["title"],
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
      //если количество заявок больше чем 1
      if (listStudentRating.length > 1) {
        //переменная с инфой о студенте
        var stud = {
          id:listStudentRating[0].student.dataValues.id,
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
        //счетчик на количество заявок с которыми стдуент прошел
        var countDestinationTrue = 0;

        //цикл на перебор заявок стдуента
        for (let y = 0; y < listStudentRating.length; y++) {
          //если заявка прошла то увеличить счетчик
          if (listStudentRating[y].destination == true) {
            countDestinationTrue++;
          }

          //добавление инфы из заявки в переменную stud
          switch (
            listStudentRating[y].rating.dataValues.ratingcourse.dataValues
              .course.dataValues.title
          ) {
            case "НИД":
              stud.nid.point = listStudentRating[y].rating.dataValues.points;
              stud.nid.destination = listStudentRating[y].destination;
              break;
            case "КТД":
              stud.ktd.point = listStudentRating[y].rating.dataValues.points;
              stud.ktd.destination = listStudentRating[y].destination;
              break;
            case "ОД":
              stud.od.point = listStudentRating[y].rating.dataValues.points;
              stud.od.destination = listStudentRating[y].destination;
              break;
            case "СД":
              stud.sd.point = listStudentRating[y].rating.dataValues.points;
              stud.sd.destination = listStudentRating[y].destination;
              break;
            case "УД":
              stud.ud.point = listStudentRating[y].rating.dataValues.points;
              stud.ud.destination = listStudentRating[y].destination;
              break;
          }
        }
        if (countDestinationTrue > 1) {
          result.push(stud);
        }
      }
    }

    return res.json(result);
  }

  async update(req, res) {
    //надо что бы на вход был ID студента которого определяют и направление которое нужно поставить destination=true

    console.log( req.query);
    //{ id: '20', course: '"НИД"' }
    
    //узнаем в каких направлениях нужно добавить студентов в прошедшие
    //ставим студенту отметку destination=false где надо
    //перебираем направления
      //получаем все заявки одного из направлений
      //запускаем цикл на завки одного из направлений
      //в цикле находим последнего кто прошел,
        //смотрим имеет ли следующий чел стипендию
        //если стипендия есть то назначить ему стипендию
      //выход из цикла

      //цикл на начисление стипендии если после последнего прошедшего стоят люди с таким же количеством

   //console.log(JSON.stringify(courses, null, 2));
    //return res.json(courses);
  }

}

module.exports = new StudentRatingManyCoursesController();
