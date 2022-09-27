const models = require("../models/models");
const { Op } = require("sequelize");
const ModelService=require("../service/model.service");

//класс отвечающий за сводку 
class ReportController {
<<<<<<< Updated upstream
  
  static async getReport(req, res) {        
    // объект с данными для сводки
    var result = [
      {
        title: "Научно-исследовательская деятельность",
        totalSubmitted: ( await ModelService.getTotalSubmitted("НИД")),
        count: (await ModelService.getСount("НИД")),
        borderPoint: (await ModelService.getBorderPoint("НИД")),
        numberReceived: (await ModelService.getNumberReceived("НИД")),
      },
      {
        title: "Учебная деятельность",
        totalSubmitted: ( await ModelService.getTotalSubmitted("УД") ),
        count: (await ModelService.getСount("УД")),
        borderPoint:  (await ModelService.getBorderPoint("УД")),
        numberReceived: (await ModelService.getNumberReceived("УД")),
      },
      {
        title: "Спортивная деятельность",
        totalSubmitted: ( await ModelService.getTotalSubmitted("СД") ),
        count: (await ModelService.getСount("СД")),
        borderPoint:  (await ModelService.getBorderPoint("СД")),
        numberReceived: (await ModelService.getNumberReceived("СД")),
      },
      {
        title: "Общественная деятельность",
        totalSubmitted: ( await ModelService.getTotalSubmitted("ОД")),
        count: (await ModelService.getСount("ОД")),
        borderPoint:  (await ModelService.getBorderPoint("ОД")),
        numberReceived: (await ModelService.getNumberReceived("ОД")),
      },
      {
        title: "Культурно-творческая деятельность",
        totalSubmitted: ( await ModelService.getTotalSubmitted("КТД")),
        count: (await ModelService.getСount("КТД")),
        borderPoint:  (await ModelService.getBorderPoint("КТД")),
        numberReceived: (await ModelService.getNumberReceived("КТД")),
      },
=======

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
>>>>>>> Stashed changes
    ];

    return res.json(result);
  }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
}

module.exports = ReportController;
