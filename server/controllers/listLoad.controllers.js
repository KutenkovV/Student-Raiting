const models = require('../models/models')
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

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
                },
                {
                    model: models.DateTable,
                    attributes: ['id','date'],
                    required:true,
                    where: {
                      'date': {
                          [Op.contains]: [
                            { value: new Date(), inclusive: true },
                            { value: new Date(), inclusive: true }
                            //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                            //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
                          ]
                      }
                  },
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
                },
                {
                    model: models.DateTable,
                    attributes: ['id','date'],
                    required:true,
                    where: {
                      'date': {
                          [Op.contains]: [
                            { value: new Date(), inclusive: true },
                            { value: new Date(), inclusive: true }
                            //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                            //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
                          ]
                      }
                  },
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
                },
                {
                    model: models.DateTable,
                    attributes: ['id','date'],
                    required:true,
                    where: {
                      'date': {
                          [Op.contains]: [
                            { value: new Date(), inclusive: true },
                            { value: new Date(), inclusive: true }
                            //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                            //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
                          ]
                      }
                  },
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
                },
                {
                    model: models.DateTable,
                    attributes: ['id','date'],
                    required:true,
                    where: {
                      'date': {
                          [Op.contains]: [
                            { value: new Date(), inclusive: true },
                            { value: new Date(), inclusive: true }
                            //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                            //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
                          ]
                      }
                  },
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
                                        'title': 'УД',
                                    }
                                },
                                {
                                    model: models.CourseLevels,attributes: ['level']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: models.DateTable,
                    attributes: ['id','date'],
                    required:true,
                    where: {
                      'date': {
                          [Op.contains]: [
                            { value: new Date(), inclusive: true },
                            { value: new Date(), inclusive: true }
                            //{ value: new Date(Date.UTC(2022, 7, 1)), inclusive: true },
                            //{ value: new Date(Date.UTC(2023, 1, 31)), inclusive: true }
                          ]
                      }
                  },
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