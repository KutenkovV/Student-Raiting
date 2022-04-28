const Router = require("express");
const router = new Router();
const RatingCountController = require("../controllers/ratingCount.controllers");
const listLoadController = require("../controllers/listLoad.controllers");
const reportController = require("../controllers/report.controllers");

const listController = require("../controllers/list.controllers");
const ktdController = require("../controllers/courses/ktd.controllers");
const nidController = require("../controllers/courses/nid.controllers");
const odController = require("../controllers/courses/od.controllers");
const sdController = require("../controllers/courses/sd.controllers");
const udController = require("../controllers/courses/ud.controllers");

const CalculateRatingController = require("../controllers/calculateRating.controllers");

//контроллеры для запросов get загруженных списков
router.get("/listLoad/ud", udController.getAll);
router.get("/listLoad/od", odController.getAll);
router.get("/listLoad/sd", sdController.getAll);
router.get("/listLoad/nid", nidController.getAll);
router.get("/listLoad/ktd", ktdController.getAll);
router.get("/listLoad/sad", listController.getAllSad);
router.get("/listLoad/vacation", listController.getAllVacation);
router.get("/listLoad/free", listController.getAllFree);

//контроллеры для загрузки списков
//router.post("/listLoad/ud", udController.getAll);
//router.post("/listLoad/od", odController.getAll);
//router.post("/listLoad/sd", sdController.getAll);
//router.post("/listLoad/nid", nidController.getAll);
//router.post("/listLoad/ktd", ktdController.getAll);
//router.post("/listLoad/sad", listLoadController.getAllSad);
//router.post("/listLoad/vacation", listLoadController.getAllVacation);
//router.post("/listLoad/free", listLoadController.getAllFree);

//контроллер для сводки
router.get("/report", reportController.getAll);

//котроллер для настроек мест рейтинга
router.get("/ratingCount", RatingCountController.getAll);
//router.get('/ratingCount/:id',ReatingCountController.getOne)
router.put("/ratingCount", RatingCountController.update);
//router.delete('/ratingCount/:id',RatingCountController.delete)

//котроллер для списков по направлениям
router.get("/ktd", ktdController.getAllWithOrder);
router.get("/nid", nidController.getAllWithOrder);
router.get("/sd", sdController.getAllWithOrder);
router.get("/od", odController.getAllWithOrder);
router.get("/ud", udController.getAllWithOrder);

//котроллер для тестирования алгоритма расчета
router.get("/test", CalculateRatingController.calculation);

module.exports = router;