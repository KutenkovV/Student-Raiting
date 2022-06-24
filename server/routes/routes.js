const Router = require("express");
const router = new Router();
const ratingCountController = require("../controllers/ratingCount.controllers");
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

//маршруты для запросов get загруженных списков
router.get("/listLoad/ud", udController.getAll);
router.get("/listLoad/od", odController.getAll);
router.get("/listLoad/sd", sdController.getAll);
router.get("/listLoad/nid", nidController.getAll);
router.get("/listLoad/ktd", ktdController.getAll);
router.get("/listLoad/sad", listController.getAllSad);
router.get("/listLoad/vacation", listController.getAllVacation);
router.get("/listLoad/free", listController.getAllFree);

//маршруты для загрузки списков
router.post("/listLoad/all", listLoadController.loadAll);
router.post("/listLoad/free", listLoadController.loadFree);
router.post("/listLoad/vacation", listLoadController.loadVacation);
router.post("/listLoad/sad", listLoadController.loadSad);

//маршрут для настроек мест рейтинга
router.get("/ratingCount", ratingCountController.getAll);
router.get("/ratingCountFromSAD", ratingCountController.getCountFromSad);
router.put("/ratingCount", ratingCountController.update);

//маршрут для тестирования алгоритма расчета
router.get("/test", CalculateRatingController.calculation);

//маршруты для списков по направлениям
router.get("/ktd", ktdController.getAllWithOrder);
router.get("/nid", nidController.getAllWithOrder);
router.get("/sd", sdController.getAllWithOrder);
router.get("/od", odController.getAllWithOrder);
router.get("/ud", udController.getAllWithOrder);

//маршрут для списка студентов которые подали на несколько направлений
router.get("/studentRatingManyCourses", studentRatingManyCourses.getAll);
router.put("/studentRatingManyCourses", studentRatingManyCourses.update);

//маршрут для сводки
router.get("/report", reportController.getAll);

//маршрут для итогового списка
router.get("/finalList", listController.getFinal);

module.exports = router;