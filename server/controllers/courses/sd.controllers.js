const listController = require("../list.controllers");

class SdController {
  async getAllWithOrder(req, res) {
    const result = await listController.getAllWithOrder("СД");

    return res.json(result);
  }

  async getAll(req, res) {
    const result = await listController.getAll("СД");
    return res.json(result);
  }
}
module.exports = new SdController();
