const models = require('../models/models')
const ApiError = require('../error/ApiError');


class ListLoadController {
    
    async getAllOd(req, res) {
               
        const result = await models.StudentsReating.findAll({
            
            attributes: ['id', 'destination'],
            required:true,
            include: [
                {
                    model: models.Students,attributes: ['studnumber','fullname','educationgroup','institute','sad'],
                },
                {
                    model: models.Reating,attributes: ['points'],
                    required:true,
                    include: [
                        {
                            model: models.ReatingCourses,
                            required:true,
                            include: [
                                {
                                    model: models.Courses,
                                    
                                    where: {
                                        'title': 'ОД',
                                    }
                                },
                                {
                                    model: models.CourseLevels,attributes: ['level']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
               
        return res.json(result)
    }

    async getAllSd(req, res) {
               
        const result = await models.StudentsReating.findAll({
            
            attributes: ['id', 'destination'],
            required:true,
            include: [
                {
                    model: models.Students,attributes: ['studnumber','fullname','educationgroup','institute','sad'],
                },
                {
                    model: models.Reating,attributes: ['points'],
                    required:true,
                    include: [
                        {
                            model: models.ReatingCourses,
                            required:true,
                            include: [
                                {
                                    model: models.Courses,
                                    
                                    where: {
                                        'title': 'СД',
                                    }
                                },
                                {
                                    model: models.CourseLevels,attributes: ['level']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
               
        return res.json(result)
    }

    async getAllNid(req, res) {
               
        const result = await models.StudentsReating.findAll({
            
            attributes: ['id', 'destination'],
            required:true,
            include: [
                {
                    model: models.Students,attributes: ['studnumber','fullname','educationgroup','institute','sad'],
                },
                {
                    model: models.Reating,attributes: ['points'],
                    required:true,
                    include: [
                        {
                            model: models.ReatingCourses,
                            required:true,
                            include: [
                                {
                                    model: models.Courses,
                                    
                                    where: {
                                        'title': 'НИД',
                                    }
                                },
                                {
                                    model: models.CourseLevels,attributes: ['level']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
               
        return res.json(result)
    }


    async getAllKtd(req, res) {
               
        const result = await models.StudentsReating.findAll({
            
            attributes: ['id', 'destination'],
            required:true,
            include: [
                {
                    model: models.Students,attributes: ['studnumber','fullname','educationgroup','institute','sad'],
                },
                {
                    model: models.Reating,attributes: ['points'],
                    required:true,
                    include: [
                        {
                            model: models.ReatingCourses,
                            required:true,
                            include: [
                                {
                                    model: models.Courses,
                                    
                                    where: {
                                        'title': 'КТД',
                                    }
                                },
                                {
                                    model: models.CourseLevels,attributes: ['level']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
               
        return res.json(result)
    }

    async getAllUd(req, res) {
               
        const result = await models.StudentsReating.findAll({
            
            attributes: ['id', 'destination'],
            required:true,
            include: [
                {
                    model: models.Students,attributes: ['studnumber','fullname','educationgroup','institute','sad'],
                },
                {
                    model: models.Reating,attributes: ['points'],
                    required:true,
                    include: [
                        {
                            model: models.ReatingCourses,
                            required:true,
                            include: [
                                {
                                    model: models.Courses,
                                    
                                    where: {
                                        'title': 'НИД',
                                    }
                                },
                                {
                                    model: models.CourseLevels,attributes: ['level']
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
               
        return res.json(result)
    }

    async getAllSad(req, res) {
               
        const result = await models.StudentsReating.findAll({
            
            
            required:true,
            include: [
                {
                    model: models.Students,attributes: ['studnumber','fullname','sad'],
                }
            ]
        });
        
               
        return res.json(result)
    }
}

module.exports = new ListLoadController()