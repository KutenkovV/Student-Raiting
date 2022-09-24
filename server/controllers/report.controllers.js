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
        numberReceived: (await ReportController.getNumberReceived("НИД")),
      },
      {
        title: "Учебная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("УД") ),
        count: (await ReportController.getСount("УД")),
        borderPoint:  (await ReportController.getBorderPoint("УД")),
        numberReceived: (await ReportController.getNumberReceived("УД")),
      },
      {
        title: "Спортивная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("СД") ),
        count: (await ReportController.getСount("СД")),
        borderPoint:  (await ReportController.getBorderPoint("СД")),
        numberReceived: (await ReportController.getNumberReceived("СД")),
      },
      {
        title: "Общественная деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("ОД")),
        count: (await ReportController.getСount("ОД")),
        borderPoint:  (await ReportController.getBorderPoint("ОД")),
        numberReceived: (await ReportController.getNumberReceived("ОД")),
      },
      {
        title: "Культурно-творческая деятельность",
        totalSubmitted: ( await ReportController.getTotalSubmitted("КТД")),
        count: (await ReportController.getСount("КТД")),
        borderPoint:  (await ReportController.getBorderPoint("КТД")),
        numberReceived: (await ReportController.getNumberReceived("КТД")),
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
}

module.exports = new ReportController();
