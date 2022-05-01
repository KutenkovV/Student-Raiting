const listController = require("../list.controllers");

class NidController {
  async getAllWithOrder(req, res) {
    const result = await listController.getAllWithOrder("НИД");

    return res.json(result);
  }

  async getAll(req, res) {
    const result = await listController.getAll("НИД");
    return res.json(result);
  }
}
module.exports = new NidController();
