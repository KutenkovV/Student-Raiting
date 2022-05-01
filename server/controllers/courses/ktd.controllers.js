const listController = require("../list.controllers");

class KtdController {
  async getAllWithOrder(req, res) {
    const result = await listController.getAllWithOrder("КТД");

    return res.json(result);
  }

  async getAll(req, res) {
    const result = await listController.getAll("КТД");
    return res.json(result);
  }
}
module.exports = new KtdController();
