const models = require("../models/models");
const { Op } = require("sequelize");
const ModelService=require("../service/model.service");

//класс отвечающий за сводку 
class ReportController {

  async getReport(req, res) {

    //функция для получения статистики по какому либо направлению
    //title - название для направления,
    //name - его краткое имя для получения статистики
    async function direction(title, name) {
      return {
        title: title,
        totalSubmitted: (await ModelService.getTotalSubmitted(name)),
        count: (await ModelService.getСount(name)),
        borderPoint: (await ModelService.getBorderPoint(name)),
        numberReceived: (await ModelService.getNumberReceived(name)),
      }
    }

    // объект с данными для сводки
    var result = [
      await direction("Научно-исследовательская деятельность", "НИД"),
      await direction("Учебная деятельность", "УД"),
      await direction("Спортивная деятельность", "СД"),
      await direction("Общественная деятельность", "ОД"),
      await direction("Культурно-творческая деятельность", "КТД"),
    ];

    return res.json(result);
  }
}

module.exports = new ReportController();
