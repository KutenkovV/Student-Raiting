const models = require("../models/models");
const { Op } = require("sequelize");
const ModelService=require("../service/model.service");

//класс отвечающий за сводку 
class ReportController {
  
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
    ];

    return res.json(result);
  }
}

module.exports = ReportController;
