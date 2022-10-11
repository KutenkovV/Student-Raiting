const Router = require("express");
const router = new Router();
const ratingCountController = require("../controllers/ratingCount.controllers");
const listLoadController = require("../controllers/listLoad.controllers");
const reportController = require("../controllers/report.controllers");
const listController = require("../controllers/list.controllers");
const finallistController = require("../controllers/finalList.controllers");
const ratingManyCoursesController = require("../controllers/ratingManyCourses.controllers");

//authorization
require("./auth.routes")(router);
require("./user.routes")(router);

//authorization

//маршруты для загрузки списков
router.post("/listLoad/all", listLoadController.loadFile);


//маршрут количества мест рейтинга
router.get("/ratingCount", ratingCountController.get);
//маршрут 10% от количества студентов получающих ГАС
router.get("/ratingCountFromSAD", ratingCountController.getCountFromSad);
//маршрут изменения количества мест
router.put("/ratingCount", ratingCountController.update);

//маршруты для списков по направлениям
router.get("/ktd", listController.getKtd);
router.get("/nid", listController.getNid);
router.get("/sd", listController.getSd);
router.get("/od", listController.getOd);
router.get("/ud", listController.getUd);

//маршрут для списка студентов которые подали на несколько направлений
router.get("/studentRatingManyCourses", ratingManyCoursesController.getStudentRatingManyCourses);

//маршрут для опеределения направления по которому будет получать студент стипендию
router.put("/studentRatingManyCourses", ratingManyCoursesController.updateStudentRatingManyCourses);

//маршрут для сводки
router.get("/report", reportController.getReport);

//маршрут для проверки готов ли финальный список
router.get("/getTheFinalFileIsReady", finallistController.getTheFinalFileIsReady);

//маршрут для итогового списка
router.get("/finalList", finallistController.getFinal);
//маршрут для итогового файла
router.get("/finalListFile", finallistController.getFinalFile);

module.exports = router;