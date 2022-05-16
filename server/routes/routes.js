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
const studentRatingManyCourses = require("../controllers/studentRatingManyCourses.controllers");

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
router.post("/listLoad/all", listLoadController.loadAll);
router.post("/listLoad/free", listLoadController.loadFree);
router.post("/listLoad/vacation", listLoadController.loadVacation);
router.post("/listLoad/sad", listLoadController.loadSad);

//котроллер для настроек мест рейтинга
router.get("/ratingCount", RatingCountController.getAll);
router.put("/ratingCount", RatingCountController.update);

//котроллер для тестирования алгоритма расчета
router.get("/test", CalculateRatingController.calculation);

//котроллер для тестирования алгоритма расчета
router.get("/testTwoCourse", studentRatingManyCourses.getAll);

//котроллер для списков по направлениям
router.get("/ktd", ktdController.getAllWithOrder);
router.get("/nid", nidController.getAllWithOrder);
router.get("/sd", sdController.getAllWithOrder);
router.get("/od", odController.getAllWithOrder);
router.get("/ud", udController.getAllWithOrder);


//контроллер для сводки
router.get("/report", reportController.getAll);

module.exports = router;