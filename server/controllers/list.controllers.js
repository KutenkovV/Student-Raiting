const models = require("../models/models");
const { Op } = require("sequelize");
const { Sequelize } = require("../db");
const ModelService=require("../service/model.service");

class ListController {

  async getKtd(req, res) {
    return res.json(await ModelService.getWithOrder("КТД"));
  }

  async getNid(req, res) {
    return res.json(await ModelService.getWithOrder("НИД"));
  }

  async getUd(req, res) {
    return res.json(await ModelService.getWithOrder("УД"));
  }

  async getSd(req, res) {
    return res.json(await ModelService.getWithOrder("СД"));
  }

  async getOd(req, res) {
    return res.json(await ModelService.getWithOrder("ОД"));
  }
}
module.exports = new ListController();
