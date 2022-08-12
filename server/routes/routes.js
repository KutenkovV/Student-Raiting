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
const RatingManyCoursesController = require("../controllers/rating.controllers");

//маршруты для запросов get загруженных списков
router.get("/listLoad/ud", udController.get);
router.get("/listLoad/od", odController.get);
router.get("/listLoad/sd", sdController.get);
router.get("/listLoad/nid", nidController.get);
router.get("/listLoad/ktd", ktdController.get);
router.get("/listLoad/sad", listController.getSad);
router.get("/listLoad/vacation", listController.getVacation);
router.get("/listLoad/free", listController.getFree);

//маршруты для загрузки списков
router.post("/listLoad/all", listLoadController.loadCourses);
router.post("/listLoad/free", listLoadController.loadFree);
router.post("/listLoad/vacation", listLoadController.loadVacation);
router.post("/listLoad/sad", listLoadController.loadSad);

//маршрут количества мест рейтинга
router.get("/ratingCount", ratingCountController.get);
//маршрут количества студентов получающих ГАС
router.get("/ratingCountFromSAD", ratingCountController.getCountFromSad);
//маршрут изменения количества мест
router.put("/ratingCount", ratingCountController.update);

//маршруты для списков по направлениям
router.get("/ktd", ktdController.getWithOrder);
router.get("/nid", nidController.getWithOrder);
router.get("/sd", sdController.getWithOrder);
router.get("/od", odController.getWithOrder);
router.get("/ud", udController.getWithOrder);

//маршрут для списка студентов которые подали на несколько направлений
router.get("/studentRatingManyCourses", RatingManyCoursesController.getStudentRatingManyCourses);
//маршрут для опеределения направления по которому будет получать студент стипендию
router.put("/studentRatingManyCourses", RatingManyCoursesController.updateStudentRatingManyCourses);

//маршрут для сводки
router.get("/report", reportController.getReport);

//маршрут для итогового списка
router.get("/finalList", listController.getFinal);

module.exports = router;