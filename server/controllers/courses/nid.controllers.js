const listController = require("../list.controllers");

class NidController {
  async getWithOrder(req, res) {
    const result = await listController.getWithOrder("НИД");

    return res.json(result);
  }

  async get(req, res) {
    const result = await listController.get("НИД");
    return res.json(result);
  }
}
module.exports = new NidController();
