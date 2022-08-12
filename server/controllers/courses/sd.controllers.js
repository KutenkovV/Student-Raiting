const listController = require("../list.controllers");

class SdController {
  async getWithOrder(req, res) {
    const result = await listController.getWithOrder("СД");

    return res.json(result);
  }

  async get(req, res) {
    const result = await listController.get("СД");
    return res.json(result);
  }
}
module.exports = new SdController();
