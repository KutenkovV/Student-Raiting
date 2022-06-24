const models = require("../models/models");
const { Op } = require("sequelize");

//класс отвечающий за сводку 

class ReportController {
  
  async getReport(req, res) {    
    // объект с данными для сводки
    var result = [
      {
        title: "Научно-исследовательская деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("НИД") ).toString(),
        count: (await ReportController.getСount("НИД")).toString(),
        borderPoint: (await ReportController.getBorderPoint("НИД")).toString(),
        nextPoint: (await ReportController.getNextPoint("НИД")).toString(),
      },
      {
        title: "Учебная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("УД") ).toString(),
        count: (await ReportController.getСount("УД")).toString(),
        borderPoint:  (await ReportController.getBorderPoint("УД")).toString(),
        nextPoint: (await ReportController.getNextPoint("УД")).toString(),
      },
      {
        title: "Спортивная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("СД") ).toString(),
        count: (await ReportController.getСount("СД")).toString(),
        borderPoint:  (await ReportController.getBorderPoint("СД")).toString(),
        nextPoint: (await ReportController.getNextPoint("СД")).toString(),
      },
      {
        title: "Общественная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("ОД")).toString(),
        count: (await ReportController.getСount("ОД")).toString(),
        borderPoint:  (await ReportController.getBorderPoint("ОД")).toString(),
        nextPoint: (await ReportController.getNextPoint("ОД")).toString(),
      },
      {
        title: "Культурно-творческая деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("КТД")).toString(),
        count: (await ReportController.getСount("КТД")).toString(),
        borderPoint:  (await ReportController.getBorderPoint("КТД")).toString(),
        nextPoint: (await ReportController.getNextPoint("КТД")).toString(),
      },
    ];

    return res.json(result);
  }

  static async getTotalSubmitted(title) {
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
    
    return totalSubmitted;
  }
  static async getСount(title) {
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

    return count[0].dataValues.count;
  }
  static async getNextPoint(title) {
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
      //в цикле находим последнего кто прошел и его баллы записываем
      if (
        list[y].rating.dataValues.points < borderPoint &&
        list[y].student.dataValues.sad == true &&
        list[y].destination == true
      ) {
        borderPoint = list[y].rating.dataValues.points;
      }
      //если добрались до перового непрошедшего то получаем его балл и выходим из цикла
      else if (
        list[y].rating.dataValues.points < borderPoint &&
        list[y].student.dataValues.sad == true &&
        list[y].destination == false
      ) {
        borderPoint = list[y].rating.dataValues.points;
        break;
      } 
    }

    return borderPoint;
  }

  static async getBorderPoint(title) {
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
    return borderPoint;
  }
}

module.exports = new ReportController();
