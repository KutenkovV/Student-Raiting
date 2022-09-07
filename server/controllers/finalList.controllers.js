const models = require("../models/models");
const { Op } = require("sequelize");
const Excel = require('exceljs');


class FinalListController {

  //
  async getFinal(req, res) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination", "cause"],
      order: [
        [
          models.Rating,
          models.RatingCourses,
          { model: models.Courses },
          "id",
          "ASC",
        ],

        [models.Rating, "points", "DESC"],
        [
          models.Rating,
          models.RatingCourses,
          { model: models.CourseLevels },
          "level",
          "ASC",
        ],
      ],
      required: true,
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
              ],
            },
          },
        },
      ],
    });
    return res.json(result);
  }
  async getFinalFile(req, res) {
    //получаем список к назначению
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination", "cause"],
      order: [
        [
          models.Rating,
          models.RatingCourses,
          { model: models.Courses },
          "id",
          "ASC",
        ],

        [models.Rating, "points", "DESC"],
        [
          models.Rating,
          models.RatingCourses,
          { model: models.CourseLevels },
          "level",
          "ASC",
        ],
      ],
      required: true,
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
              ],
            },
          },
        },
      ],
    });
    //создаем файл excel
    var workbook = new Excel.Workbook();

    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;

    workbook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ];
    var worksheet = workbook.addWorksheet('К назначению');
    //создаем колонки
    worksheet.columns = [
      { header: 'Позиция в направлении', key: 'position', width: 10 },
      { header: 'Студент', key: 'fullname', width: 32 },
      { header: 'Факультет', key: 'institute', width: 10 },
      { header: 'Группа', key: 'educationgroup', width: 10 },
      { header: 'Направление', key: 'courses', width: 10 },
      { header: 'Балл', key: 'points', width: 10 },
      { header: 'Категория', key: 'level', width: 10 },
      { header: 'Сумма', key: 'summ', width: 10 },
      { header: 'Период', key: 'date', width: 10 },
      { header: 'Статус', key: 'cause', width: 10 },
      { header: 'ПГАС', key: 'destination', width: 10 },
      { header: 'ID', key: 'studnumber', width: 10 },
      //{ header: 'Факультет', key: 'dob', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1)] }
    ];

    //worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    //worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

    for (let i = 0; i < result.length; i++) {
      
      worksheet.addRow({ 
        position: 1, 
        fullname: result[i].student.dataValues.fullname , 
        institute: result[i].student.dataValues.institute,
        educationgroup: result[i].student.dataValues.educationgroup,
        courses: result[i].student.dataValues.courses,
        
      
      });
      
      // if (
      //   result[i].rating.dataValues.points == c1 &&
      //   result[i].student.dataValues.sad == true
      // ) {
       
      // }
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "rating.xlsx");
    workbook.xlsx.write(res)
      .then(function (data) {
        res.end();
        console.log('File write done........');
      });
  }
}
module.exports = new FinalListController();
