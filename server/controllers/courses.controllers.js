const {ReatingCourses,Courses,CourseLevels,DateTable,ReatingCount,Reating,Students,StudentsReating} = require('../models/models')
const ApiError = require('../error/ApiError');

class CoursesController {
    
    async getAll(req, res) {
               
        const courses = await ReatingCount.findAll({ include: [{ all: true }]})
       //attributes: ['foo', 'bar']
        //console.log(JSON.stringify(courses, null, 2));
        return res.json(courses)
    }
    async getAllReating(req, res) {
               
        const courses = await Reating.findAll({ include: [{ all: true }]})
        //console.log(JSON.stringify(courses, null, 2));
        return res.json(courses)
    }
    async getAllStudents(req, res) {
               
        const courses = await Students.findAll({ include: [{ all: true }]})
        //console.log(JSON.stringify(courses, null, 2));
        return res.json(courses)
    }
    async getAllMain(req, res) {
               
        const courses = await StudentsReating.findAll({ include: [{ all: true }]})
        //console.log(JSON.stringify(courses, null, 2));
        return res.json(courses)
    }
    /*async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }*/
}

module.exports = new CoursesController()