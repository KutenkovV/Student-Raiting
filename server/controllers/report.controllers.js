const models = require("../models/models");
const { Op } = require("sequelize");

//класс отвечающий за сводку 

class ReportController {
  
  async getReport(req, res) {        
    // объект с данными для сводки
    var result = [
      {
        title: "Научно-исследовательская деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("НИД") ),
        count: (await ReportController.getСount("НИД")),
        borderPoint: (await ReportController.getBorderPoint("НИД")),
        //nextPoint: (await ReportController.getNextPoint("НИД")),
      },
      {
        title: "Учебная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("УД") ),
        count: (await ReportController.getСount("УД")),
        borderPoint:  (await ReportController.getBorderPoint("УД")),
        //nextPoint: (await ReportController.getNextPoint("УД")),
      },
      {
        title: "Спортивная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("СД") ),
        count: (await ReportController.getСount("СД")),
        borderPoint:  (await ReportController.getBorderPoint("СД")),
        //nextPoint: (await ReportController.getNextPoint("СД")),
      },
      {
        title: "Общественная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("ОД")),
        count: (await ReportController.getСount("ОД")),
        borderPoint:  (await ReportController.getBorderPoint("ОД")),
        //nextPoint: (await ReportController.getNextPoint("ОД")),
      },
      {
        title: "Культурно-творческая деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("КТД")),
        count: (await ReportController.getСount("КТД")),
        borderPoint:  (await ReportController.getBorderPoint("КТД")),
        //nextPoint: (await ReportController.getNextPoint("КТД")),
      },
    ];

    return res.json(result);
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
  // static async getNextPoint(title) {

  //   try {

  //     //получаем список заявок студентов за актуальную дату по заданному направлению
  //     const list = await models.StudentsRating.findAll({
  //       attributes: ["id", "destination"],
  //       order: [
  //         [models.Students, "sad", "DESC NULLS LAST"],
  //         [models.Rating, "points", "DESC"],
  //       ],
  //       include: [
  //         {
  //           model: models.Students,
  //           attributes: [
  //             "studnumber",
  //             "fullname",
  //             "educationgroup",
  //             "institute",
  //             "sad",
  //           ],
  //         },
  //         {
  //           model: models.Rating,
  //           attributes: ["points"],
  //           required: true,
  //           include: [
  //             {
  //               model: models.RatingCourses,
  //               required: true,
  //               include: [
  //                 {
  //                   model: models.Courses,
  //                   attributes: ["title"],
  //                   where: {
  //                     title: title,
  //                   },
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           model: models.DateTable,
  //           attributes: ["id", "date"],
  //           required: true,
  //           where: {
  //             date: {
  //               [Op.contains]: [
  //                 { value: new Date(), inclusive: true },
  //                 { value: new Date(), inclusive: true },
  //               ],
  //             },
  //           },
  //         },
  //       ],
  //     });
  //     var borderPoint=list[0].rating.dataValues.points;
  //     for (let y = 0; y < list.length; y++) {
  //       //в цикле находим последнего кто прошел и его баллы записываем
  //       if (
  //         list[y].rating.dataValues.points < borderPoint &&
  //         list[y].student.dataValues.sad == true &&
  //         list[y].destination == true
  //       ) {
  //         borderPoint = list[y].rating.dataValues.points;
  //       }
  //       //если добрались до перового непрошедшего то получаем его балл и выходим из цикла
  //       else if (
  //         list[y].rating.dataValues.points < borderPoint &&
  //         list[y].student.dataValues.sad == true &&
  //         list[y].destination == false
  //       ) {
  //         borderPoint = list[y].rating.dataValues.points;
  //         break;
  //       } 
  //     }

  //     return borderPoint.toString();
    
  //   } catch (err) {
  //     return '0';
  //   }

    
  // }

  static async getBorderPoint(title) {
    

    try {

      //получаем список заявок студентов за актуальную дату по заданному направлению
    const list = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
      order: [
        [models.Students, "sad", "DESC NULLS LAST"],
        [models.Rating, "points", "DESC"],
      ],
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
    var borderPoint=list[0].rating.dataValues.points;
    for (let y = 0; y < list.length; y++) {
      //в цикле находим последнего кто прошел и получаем его балл
      if (
        list[y].rating.dataValues.points < borderPoint &&
        list[y].student.dataValues.sad == true &&
        list[y].destination == true
      ) {
        borderPoint = list[y].rating.dataValues.points;
      }
    }
    return borderPoint.toString();
    
    } catch (err) {
    
      return '0';
    
    }
  }
}

module.exports = new ReportController();
