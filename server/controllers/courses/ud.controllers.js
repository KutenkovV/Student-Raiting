const listController = require("../list.controllers");

class UdController {
  async getWithOrder(req, res) {
    const result = await listController.getWithOrder("УД");

    return res.json(result);
  }

  async get(req, res) {
    const result = await listController.get("УД");
    return res.json(result);
  }
}
module.exports = new UdController();
