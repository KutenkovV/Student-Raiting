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
    const list1 = await models.StudentsRating.findAll({
      attributes: ["id", "destination", "cause"],
      where: {
        destination: true,
      },
      order: [
        [models.Students, "institute","ASC",],
        [models.Students, "educationgroup","ASC",],
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
    //первый лист.............................................................................
    var worksheet = workbook.addWorksheet('К назначению');
    //создаем колонки
    worksheet.columns = [
      { header: 'Позиция в направлении', key: 'position', width: 10, style: { font: { name: 'Times New Roman',size:12,bold:true } }},
      { header: 'Студент', key: 'fullname', width: 40 ,style: { font: { name: 'Times New Roman',size:12,bold:true },alignment :{ vertical: 'middle', horizontal: 'center'}}},
      { header: 'Факультет', key: 'institute', width: 15 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'Группа', key: 'educationgroup', width: 15 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'Направление', key: 'courses', width: 20 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'Балл', key: 'points', width: 10 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'Категория', key: 'level', width: 15 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'Сумма', key: 'sum', width: 15 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'Период', key: 'period', width: 20 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'Статус', key: 'cause', width: 15 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'ПГАС', key: 'destination', width: 15 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      { header: 'ID', key: 'studnumber', width: 20 ,style: { font: { name: 'Times New Roman',size:12,bold:true }}},
      //{ header: 'Факультет', key: 'dob', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1)] }
    ];
    
    for (let i = 0; i < list1.length; i++) {
      var sum =0;

        (list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==1 ) ? sum=12500 :
        (list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==2) ? sum=11250 :
        (list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==3) ? sum=10000 :
        sum=9300;

      worksheet.addRow({ 
        position: 1, 
        fullname: list1[i].student.dataValues.fullname , 
        institute: list1[i].student.dataValues.institute,
        educationgroup: list1[i].student.dataValues.educationgroup,
        courses: list1[i].rating.dataValues.ratingcourse.dataValues.course.dataValues.title,
        points: list1[i].rating.dataValues.points,
        level: list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level==0 ? "" : list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level,
        sum: sum,
        period: "На срок академич.",
        cause:   list1[i].cause ? list1[i].cause : "",
        destination: list1[i].destination ? "Назначить" : list1[i].destination,
        studnumber:list1[i].student.dataValues.studnumber
      },{ font: { name: 'Times New Roman',size:12 ,bold:false}});
    }


    const list2 = await models.StudentsRating.findAll({
      attributes: ["id", "destination", "cause"],
      where: {
        destination: true,
      },
      order: [
        [models.Students, "institute","ASC",],
        [models.Students, "educationgroup","ASC",],
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
    //второй лист.............................................................................
    var worksheet = workbook.addWorksheet('К публикации');
    //создаем колонки
    worksheet.columns = [
      { header: 'Позиция в направлении', key: 'position', width: 10 },
      { header: 'Студент', key: 'fullname', width: 32 },
      { header: 'Факультет', key: 'institute', width: 10 },
      { header: 'Группа', key: 'educationgroup', width: 10 },
      { header: 'Направление', key: 'courses', width: 10 },
      { header: 'Балл', key: 'points', width: 10 },
      { header: 'Категория', key: 'level', width: 10 },
      { header: 'Статус ПГАС', key: 'destination', width: 10 },

    ];
    
    for (let i = 0; i < list2.length; i++) {
      var sum =0;

        (list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==1 ) ? sum=12500 :
        (list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==2) ? sum=11250 :
        (list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==3) ? sum=10000 :
        sum=9300;

      worksheet.addRow({ 
        position: 1, 
        fullname: list2[i].student.dataValues.fullname , 
        institute: list2[i].student.dataValues.institute,
        educationgroup: list2[i].student.dataValues.educationgroup,
        courses: list2[i].rating.dataValues.ratingcourse.dataValues.course.dataValues.title,
        points: list2[i].rating.dataValues.points,
        level: list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level==0 ? "" : list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level,
        destination: list2[i].destination ? "Назначить" : list2[i].destination,
      });
    }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "rating.xlsx");
    workbook.xlsx.write(res)
      .then(function (data) {
        res.end();
      });
  }
}
module.exports = new FinalListController();
