const Router = require("express");
const router = new Router();
const RatingCountController = require("../controllers/ratingCount.controllers");
const listLoadController = require("../controllers/listLoad.controllers");
const reportController = require("../controllers/report.controllers");
const ktdController = require("../controllers/ktd.controllers");
const nidController = require("../controllers/nid.controllers");
const odController = require("../controllers/od.controllers");
const sdController = require("../controllers/sd.controllers");
const udController = require("../controllers/ud.controllers");

const CalculateRatingController = require("../controllers/calculateRating.controllers");

//контроллеры для загрузки списков
router.get("/listLoad/ud", listLoadController.getAllUd);
router.get("/listLoad/od", listLoadController.getAllOd);
router.get("/listLoad/sd", listLoadController.getAllSd);
router.get("/listLoad/nid", listLoadController.getAllNid);
router.get("/listLoad/ktd", listLoadController.getAllKtd);
router.get("/listLoad/sad", listLoadController.getAllSad);

//контроллер для сводки
router.get("/report", reportController.getAll);

//котроллер для настроек мест рейтинга
router.get("/ratingCount", RatingCountController.getAll);
//router.get('/ratingCount/:id',ReatingCountController.getOne)
router.put("/ratingCount", RatingCountController.update);
//router.delete('/ratingCount/:id',RatingCountController.delete)

//котроллер для списков по направлениям
router.get("/ktd", ktdController.getAll);
router.get("/nid", nidController.getAll);
router.get("/sd", sdController.getAll);
router.get("/od", odController.getAll);
router.get("/ud", udController.getAll);

//котроллер для тестирования алгоритма расчета
router.get("/test", CalculateRatingController.calculation);

module.exports = router;
