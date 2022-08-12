const listController = require("../list.controllers");

class KtdController {
  async getWithOrder(req, res) {
    const result = await listController.getWithOrder("КТД");
    return res.json(result);
  }

  async get(req, res) {
    const result = await listController.get("КТД");
    return res.json(result);
  }
}
module.exports = new KtdController();
