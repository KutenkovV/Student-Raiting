const listController = require("../list.controllers");

class OdController {
  async getWithOrder(req, res) {
    const result = await listController.getWithOrder("ОД");

    return res.json(result);
  }

  async get(req, res) {
    const result = await listController.get("ОД");
    return res.json(result);
  }

  
}
module.exports = new OdController();
