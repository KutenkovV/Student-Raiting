const Router = require('express')
const router = new Router()
const RatingCountController = require('../controllers/ratingCount.controllers')
const listLoadController = require('../controllers/listLoad.controllers')
const reportController = require('../controllers/report.controllers')


/*router.get('/courses',coursesController.getAll)
router.get('/reating',coursesController.getAllReating)
router.get('/students',coursesController.getAllStudents)
router.get('/main',coursesController.getAllMain)
*/

router.get('/listLoad/ud',listLoadController.getAllUd)
router.get('/listLoad/od',listLoadController.getAllOd)
router.get('/listLoad/sd',listLoadController.getAllSd)
router.get('/listLoad/nid',listLoadController.getAllNid)
router.get('/listLoad/ktd',listLoadController.getAllKtd)
router.get('/listLoad/sad',listLoadController.getAllSad)

router.get('/report',reportController.getAll)

router.get('/ratingCount',RatingCountController.getAll)
//router.get('/ratingCount/:id',ReatingCountController.getOne)
router.put('/ratingCount',RatingCountController.update)
//router.delete('/ratingCount/:id',RatingCountController.delete)


module.exports = router