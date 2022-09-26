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
        [
          models.Rating,
          models.RatingCourses,
          { model: models.Courses },
          "title",
          "ASC",
        ],
        [models.Students, "vacation","ASC",],
        [models.Rating, "points","DESC",],
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
            "vacation",
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

    const fontHeader = { name: 'Times New Roman', size:12,bold:true };
    const font = { name: 'Times New Roman', size:12 };

    //создаем колонки
    worksheet.columns = [
      { header: 'Позиция в направлении', key: 'position', width: 10,},
      { header: 'Студент', key: 'fullname', width: 40 },
      { header: 'Факультет', key: 'institute', width: 12 },
      { header: 'Группа', key: 'educationgroup', width: 15 },
      { header: 'Направление', key: 'courses', width: 15 },
      { header: 'Балл', key: 'points', width: 10 },
      { header: 'Категория', key: 'level', width: 12 },
      { header: 'Сумма', key: 'sum', width: 12 },
      { header: 'Период', key: 'period', width: 20 },
      { header: 'Статус', key: 'cause', width: 12 },
      { header: 'ПГАС', key: 'destination', width: 15 },
      { header: 'ID', key: 'studnumber', width: 12 },
    ];

    worksheet.columns.map(item => {
      item.style={font:font}
      item.border={
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      }
    })

    worksheet.getRow(1).font=fontHeader;
    worksheet.getRow(1).height=45;
    worksheet.autoFilter = 'A1:L1';
    worksheet.getRow(1).alignment={ horizontal: 'center',vertical:'middle'}
    worksheet.getColumn(1).alignment={ wrapText:true, horizontal: 'center'}
    worksheet.getCell('A1').font ={name: 'Times New Roman', size:9,bold:true} ;
    let position=1;
    for (let i = 0; i < list1.length; i++) {


      var sum =0;

      (list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==1 ) ? sum=12500 :
      (list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==2) ? sum=11250 :
      (list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==3) ? sum=10000 :
      sum=9300;

      list1[i].rating.dataValues.ratingcourse.dataValues.course.dataValues.title != list1[i-1]?.rating.dataValues.ratingcourse.dataValues.course.dataValues.title
       ? position=1 : position ++;


      worksheet.addRow({ 
        position: list1[i].student.dataValues.vacation==true? "" : position, 
        fullname: list1[i].student.dataValues.fullname , 
        institute: list1[i].student.dataValues.institute,
        educationgroup: list1[i].student.dataValues.educationgroup,
        courses: list1[i].rating.dataValues.ratingcourse.dataValues.course.dataValues.title,
        points: list1[i].rating.dataValues.points,
        level: list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level==0 ? "" : 
        list1[i].rating.ratingcourse.dataValues.courselevel.dataValues.level,
        sum: sum,
        period: "На срок академич.",
        cause:   list1[i].cause ?  list1[i].cause : list1[i].student.dataValues.vacation==true? "Каникулы"  : "",
        destination: list1[i].destination ? "Назначить" : list1[i].destination,
        studnumber:list1[i].student.dataValues.studnumber
      } );
      if (list1[i].student.dataValues.vacation==true) { 
        
        for (let i = 1; i <= worksheet.lastRow.actualCellCount; i++) { 
          worksheet.lastRow.getCell(i).fill={
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'badbad'},
          } 
        }
      }
    }

    const list2 = await models.StudentsRating.findAll({
      attributes: ["id", "destination", "cause"],
      where: {
        destination: true,
      },
      order: [
        [
          models.Rating,
          models.RatingCourses,
          { model: models.Courses },
          "title",
          "ASC",
        ],
        [models.Students, "vacation","ASC",],
        [models.Rating, "points","DESC",],
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
            "vacation",
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
    var worksheet2 = workbook.addWorksheet('К публикации');
    //создаем колонки


    worksheet2.columns = [
      { header: 'Позиция в направлении', key: 'position', width: 10 },
      { header: 'Студент', key: 'fullname', width: 32 },
      { header: 'Факультет', key: 'institute', width: 16 },
      { header: 'Группа', key: 'educationgroup', width: 12 },
      { header: 'Направление', key: 'courses', width: 19 },
      { header: 'Балл', key: 'points', width: 10 },
      { header: 'Категория', key: 'level', width: 16 },
      { header: 'Статус ПГАС', key: 'destination', width: 19 },
    ];

    worksheet2.columns.map(item => {
      item.style={font:font}
      item.border={
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      }
    })




    worksheet2.getRow(1).font=fontHeader;
    worksheet2.getRow(1).height=45;
    worksheet2.autoFilter = 'A2:H2';
    worksheet2.getRow(1).alignment={ horizontal: 'center',vertical:'middle'}
    worksheet2.getColumn(1).alignment={ wrapText:true, horizontal: 'center'}
    worksheet2.getCell('A2').font ={name: 'Times New Roman', size:9,bold:true} ;
    position=1;
    for (let i = 0; i < list2.length; i++) {
      var sum =0;

        (list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==1 ) ? sum=12500 :
        (list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==2) ? sum=11250 :
        (list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level ==3) ? sum=10000 :
        sum=9300;

      worksheet2.addRow({ 
        position: position++, 
        fullname: list2[i].student.dataValues.fullname , 
        institute: list2[i].student.dataValues.institute,
        educationgroup: list2[i].student.dataValues.educationgroup,
        courses: list2[i].rating.dataValues.ratingcourse.dataValues.course.dataValues.title,
        points: list2[i].rating.dataValues.points,
        level: list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level==0 ? "" :
        list2[i].rating.ratingcourse.dataValues.courselevel.dataValues.level,
        destination: list2[i].destination ? "Назначить" : list2[i].destination,
      });
    }
    worksheet2.insertRows(1, "1");
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "rating.xlsx");
    workbook.xlsx.write(res)
      .then(function (data) {
        res.end();
      });
  }
}
module.exports = new FinalListController();

