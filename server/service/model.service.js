const models = require("../models/models");
const { Op } = require("sequelize");
const { Sequelize } = require("../db");
<<<<<<< Updated upstream

//класс отвечающий за сводку 

class ModelService {


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

        const result = await models.StudentsRating.findAll({
            attributes: [
                "id",
                //[Sequelize.literal('ROW_NUMBER() over (ORDER BY (StudentsRating.id))'), 'rowNumber'],
                "destination",
                "cause",
            ],
            order: [
                ["destination", "DESC"],
                [models.Students, "free", "ASC"],
                [models.Students, "sad", "DESC"],
                ["cause", "DESC"],
                [models.Rating, "points", "DESC"],
                [
                    models.Rating,
                    models.RatingCourses,
                    { model: models.CourseLevels },
                    "level",
                    "ASC",
                ],
                [models.Students, "fullname", "ASC"],
            ],
            required: true,
            include: students,
        });

        //цикл на изменение true=>да, false=>нет
        for (let i = 0; i < result.length; i++) {
          Object.assign(result[i].dataValues, {"rowNumber": i+1} );
            if (
                result[i].student.dataValues.sad == true
            ) {
                result[i].student.dataValues.sad = "Да"
            }
            else {
                result[i].student.dataValues.sad = "Нет"
            }
            if (
                result[i].student.dataValues.vacation == true
            ) {
                result[i].student.dataValues.vacation = "Да"
            }
            else {
                result[i].student.dataValues.vacation = "Нет"
            }
            if (
                result[i].student.dataValues.free == true
            ) {
                result[i].student.dataValues.free = "Да"
            }
            else {
                result[i].student.dataValues.free = "Нет"
            }
        }

        return result;
    }

    static async getTotalSubmitted(title) {
        try {
          //получаем число поданных заявок
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
                    ],
                  },
                },
              },
            ],
          });
          return totalSubmitted.toString();
        } catch (err) {
          return '0';
        }
    }
    static async getСount(title) {
    
    try {
        
        //получаем количество заданных стипендий
        const count = await models.RatingCount.findAll({
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
                
                ],
                },
            },
            },
        ],
        });

        return count[0].dataValues.count.toString();
    } catch (err) {
        return '0';
    }
    }
    static async getNumberReceived(title) {
    try {
        //получаем список заявок студентов за актуальную дату по заданному направлению
        const count = await models.StudentsRating.findAll({
        attributes: ["id", "destination"],
        where: {
            destination:true,
        },
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
                    attributes: ["title"],
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
                ],
                },
            },
            },
        ],
        });
        return count.length.toString();
    } catch (err) {
        return '0';
    }
    }

    static async getBorderPoint(title) {
    try {
        //получаем список заявок студентов за актуальную дату по заданному направлению
        const list = await models.StudentsRating.findAll({
        attributes: ["id", "destination"],
        order: [
            [models.Rating, "points", "DESC"],
        ],
        where:{
            destination:true,
        },
        include: [
            {
            model: models.Students,
            where:{
                sad:true,
                vacation:false,
                free:false
            },
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
                ],
                },
            },
            },
        ],
        });
        return list[list.length-1].rating.dataValues.points.toString();
    } catch (err) {
        return '0';
    }
    }

      //метод изменения количества мест по одному направлению
    static async updateCountCourse(title, count) {
        //получаем id направления
        const course = await models.RatingCount.findOne({
        attributes: ["id"],
        include: [
            {
            model: models.Courses,
            where: {
                title: title,
            },
            },
            {
            model: models.DateTable,
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
        //изменяем количество мест
        await models.RatingCount.update(
        { count: parseInt(count) },
        {
            where: {
            id: course.id,
            },
        }
        );
    }

    static async updateVacation(title,lastPoint) {
        //список студентов по заданному направлению
        const listVacation = await models.StudentsRating.findAll({
         attributes: ["id", "destination"],
         order: [
           [models.Students, "sad", "DESC NULLS LAST"],
           [models.Rating, "points", "DESC"],
         ],
         required: true,
         include: [
           {
             model: models.Students,
             where:{
               sad:true,
               vacation:true
             },
             attributes: [
               "studnumber",
               "fullname",
               "educationgroup",
               "institute",
               "sad",
               "vacation",
               "free"
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
                   //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                   //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
                 ],
               },
             },
           },
         ],
       });
       //цикл на начисление стипендии каникулярным
       for (let i = 0; i < listVacation.length; i++) {
         if (
           listVacation[i].rating.dataValues.points >= lastPoint
         ) {
           await models.StudentsRating.update(
             { destination: true ,cause: "Каникулы"},
             {
               where: {
                 id: listVacation[i].dataValues.id,
               },
             }
           );
         }
         //иначе пишем не достаточно баллов
         else {
           await models.StudentsRating.update(
             { destination: false,cause: "Не дост. баллов" },
             {
               where: {
                 id: listVacation[i].dataValues.id,
               },
             }
           );
         }
       }
     }
=======
const PreparedModels = require("./prepared.models");

const includeModel = PreparedModels.includeModel;

//класс отвечающий за сводку 
class ModelService {

  //---------------------------------------------------------------------------------------------------------------------------
  //получить данные о студентах с сортировкой (по баллам)

  static async getWithOrder(title) {

    const courses = [
      PreparedModels.getCoursesByTitle(title),
      includeModel(models.CourseLevels, { attributes: ["level"] })
    ]

    const ratingCourses = PreparedModels.getRatingCourses(courses)

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

      PreparedModels.getRating(ratingCourses, ["points"]),
      PreparedModels.getDateTableIdAndDate
    ]

    const result = await models.StudentsRating.findAll({
      attributes: [
        "id",
        [Sequelize.literal('ROW_NUMBER() over (ORDER BY (select 0))'), 'rowNumber'],
        "destination",
        "cause",
      ],
      order: [
        ["destination", "DESC"],
        [models.Students, "free", "ASC"],
        [models.Students, "sad", "DESC"],
        ["cause", "DESC"],
        [models.Rating, "points", "DESC"],
        [
          models.Rating,
          models.RatingCourses,
          { model: models.CourseLevels },
          "level",
          "ASC",
        ],
        [models.Students, "fullname", "ASC"],
      ],
      required: true,
      include: students,
    });

    const checkInfo = (studInfo) => (studInfo ? "Да" : "Нет")

    //цикл на изменение true=>да, false=>нет
    for (let i = 0; i < result.length; i++) {

      var studInfo = result[i].student.dataValues

      studInfo.sad = checkInfo(studInfo.sad)
      studInfo.vacation = checkInfo(studInfo.vacation)
      studInfo.free = checkInfo(studInfo.free)
    }

    return result;
  }

  //---------------------------------------------------------------------------------------------------------------------------
  //получаем число поданных заявок

  static async getTotalSubmitted(title) {

    const courses = PreparedModels.getCoursesByTitle(title)
    const ratingCourses = PreparedModels.getRatingCourses(courses)
    const rating = PreparedModels.getRating(ratingCourses)

    try {

      const totalSubmitted = await models.StudentsRating.count({
        required: true,
        include: [
          rating,
          PreparedModels.getDateTableIdAndDate,
        ],
      });

      return totalSubmitted.toString();
    } catch (err) {
      return '0';
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------
  //получаем количество заданных стипендий (вакансий)

  static async getСount(title) {

    const courses = PreparedModels.getCoursesByTitle(title)

    try {

      const count = await models.RatingCount.findAll({
        required: true,
        attributes: ["count"],
        include: [
          courses,
          PreparedModels.getDateTableIdAndDate,
        ],
      });

      return count[0].dataValues.count.toString();
    } catch (err) {
      return '0';
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------
  //получаем список заявок студентов за актуальную дату по заданному направлению

  static async getNumberReceived(title) {

    const courses = PreparedModels.getCoursesByTitle(title)
    const ratingCourses = PreparedModels.getRatingCourses(courses)
    const rating = PreparedModels.getRating(ratingCourses)

    try {

      const count = await models.StudentsRating.findAll({
        attributes: ["id", "destination"],
        where: {
          destination: true,
        },
        include: [
          rating,
          PreparedModels.getDateTableIdAndDate,
        ],
      });
      return count.length.toString();
    } catch (err) {
      return '0';
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------
  //получаем список заявок студентов за актуальную дату по заданному направлению

  static async getBorderPoint(title) {

    const courses = PreparedModels.getCoursesByTitle(title)
    const ratingCourses = PreparedModels.getRatingCourses(courses)
    const rating = PreparedModels.getRating(ratingCourses,["points"])

    try {

      const list = await models.StudentsRating.findAll({
        attributes: ["id", "destination"],
        order: [
          [models.Rating, "points", "DESC"],
        ],
        where: {
          destination: true,
        },
        include: [
          {
            model: models.Students,
            where: {
              sad: true,
              vacation: false,
              free: false
            },
          },
          rating,
          PreparedModels.getDateTableIdAndDate,
        ],
      });
      return list[list.length - 1].rating.dataValues.points.toString();
    } catch (err) {
      return '0';
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------
  //метод изменения количества мест по одному направлению

  static async updateCountCourse(title, count) {

    const courses = PreparedModels.getCoursesByTitle(title)

    //получаем id направления
    const course = await models.RatingCount.findOne({
      attributes: ["id"],
      include: [
        courses,
        PreparedModels.getDateTableIdAndDate,
      ],
    });
    
    //изменяем количество мест
    await models.RatingCount.update(
      { count: parseInt(count) },
      {
        where: {
          id: course.id,
        },
      }
    );
  }

  //---------------------------------------------------------------------------------------------------------------------------

  static async updateVacation(title, lastPoint) {

    const courses = PreparedModels.getCoursesByTitle(title)
    const ratingCourses = PreparedModels.getRatingCourses(courses)
    const rating = PreparedModels.getRating(ratingCourses,["points"])

    
    //список студентов по заданному направлению
    const listVacation = await models.StudentsRating.findAll({
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
            sad: true,
            vacation: true
          },
          attributes: [
            "studnumber",
            "fullname",
            "educationgroup",
            "institute",
            "sad",
            "vacation",
            "free"
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
                //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
              ],
            },
          },
        },
      ],
    });

    //цикл на начисление стипендии каникулярным
    for (let i = 0; i < listVacation.length; i++) {
      if (
        listVacation[i].rating.dataValues.points >= lastPoint
      ) {
        await models.StudentsRating.update(
          { destination: true, cause: "Каникулы" },
          {
            where: {
              id: listVacation[i].dataValues.id,
            },
          }
        );
      }
      //иначе пишем не достаточно баллов
      else {
        await models.StudentsRating.update(
          { destination: false, cause: "Не дост. баллов" },
          {
            where: {
              id: listVacation[i].dataValues.id,
            },
          }
        );
      }
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------

>>>>>>> Stashed changes
}
module.exports = ModelService;