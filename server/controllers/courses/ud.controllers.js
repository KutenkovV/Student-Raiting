const listController = require("../list.controllers");

class UdController {
  async getAllWithOrder(req, res) {
    const result = await listController.getAllWithOrder("УД");

    return res.json(result);
  }

  async getAll(req, res) {
    const result = await listController.getAll("УД");
    return res.json(result);
  }
}
module.exports = new UdController();
