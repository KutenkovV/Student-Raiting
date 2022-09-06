const models = require("../models/models");
const { Op } = require("sequelize");
const Excel = require('exceljs');


class FinalListController {

  //
  async getFinal(req, res) {
    const result = await models.StudentsRating.findAll({
      attributes: ["id", "destination","cause"],
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
    //console.log(result)
    return res.json(result);
  }
  async getFinalFile(req, res) {
    var workbook = new Excel.Workbook();

	workbook.creator = 'Me';
	workbook.lastModifiedBy = 'Her';
	workbook.created = new Date(1985, 8, 30);
	workbook.modified = new Date();
	workbook.lastPrinted = new Date(2016, 9, 27);
	workbook.properties.date1904 = true;

	workbook.views = [
		{
			x: 0, y: 0, width: 10000, height: 20000,
			firstSheet: 0, activeTab: 1, visibility: 'visible'
		}
	];
	var worksheet = workbook.addWorksheet('My Sheet');
	worksheet.columns = [
		{ header: 'Id', key: 'id', width: 10 },
		{ header: 'Name', key: 'name', width: 32 },
		{ header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1)] }
	];

	worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
	worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	res.setHeader("Content-Disposition", "attachment; filename=" + "Рейтинг итог.xlsx");
	workbook.xlsx.write(res)
		.then(function (data) {
			res.end();
			console.log('File write done........');
		});
  }
}
module.exports = new FinalListController();
