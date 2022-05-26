const listController = require("../list.controllers");

class OdController {
  async getAllWithOrder(req, res) {
    const result = await listController.getAllWithOrder("ОД");

    return res.json(result);
  }

  async getAll(req, res) {
    const result = await listController.getAll("ОД");
    return res.json(result);
  }

  
}
module.exports = new OdController();
