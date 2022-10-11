const Router = require("express");
const router = new Router();
const ratingCountController = require("../controllers/ratingCount.controllers");
const listLoadController = require("../controllers/listLoad.controllers");
const reportController = require("../controllers/report.controllers");
const listController = require("../controllers/list.controllers");
const finallistController = require("../controllers/finalList.controllers");
const ratingManyCoursesController = require("../controllers/ratingManyCourses.controllers");
const usersController = require("../controllers/users.controllers");
const {authByToken} = require('../middleware/auth')

router.post('/users/login',usersController.loginUser) 

// router.post('/users/create',usersController.createUser) 

//маршруты для загрузки списков
router.post("/listLoad/all", authByToken,listLoadController.loadFile);

//маршрут количества мест рейтинга
router.get("/ratingCount",authByToken, ratingCountController.get);
//маршрут 10% от количества студентов получающих ГАС
router.get("/ratingCountFromSAD",authByToken, ratingCountController.getCountFromSad);
//маршрут изменения количества мест
router.put("/ratingCount",authByToken, ratingCountController.update);

//маршруты для списков по направлениям
router.get("/ktd",authByToken, listController.getKtd);
router.get("/nid",authByToken, listController.getNid);
router.get("/sd",authByToken, listController.getSd);
router.get("/od",authByToken, listController.getOd);
router.get("/ud",authByToken, listController.getUd);

//маршрут для списка студентов которые подали на несколько направлений
router.get("/studentRatingManyCourses",authByToken, ratingManyCoursesController.getStudentRatingManyCourses);

//маршрут для опеределения направления по которому будет получать студент стипендию
router.put("/studentRatingManyCourses",authByToken, ratingManyCoursesController.updateStudentRatingManyCourses);

//маршрут для сводки
router.get("/report",authByToken, reportController.getReport);

//маршрут для проверки готов ли финальный список
router.get("/getTheFinalFileIsReady",authByToken, finallistController.getTheFinalFileIsReady);

//маршрут для итогового списка
router.get("/finalList",authByToken, finallistController.getFinal);
//маршрут для итогового файла
router.get("/finalListFile",authByToken, finallistController.getFinalFile);

module.exports = router;