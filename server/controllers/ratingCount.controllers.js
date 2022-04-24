const models = require("../models/models");
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');
const calculateRatingController = require("./calculateRating.controllers");

class RatingCountController {
    
    async getAll(req, res) {
               
        const courseCount = await models.RatingCount.findAll({ 
            required: true,
            attributes: ['id','count'],
            include: [
              {
                model: models.Courses,attributes: ['title'],
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
        }
        )
       
        return res.json(courseCount)
    }
    async delete(req, res) {
               
        const courses = await Reating.findAll({ include: [{ all: true }]})
        //console.log(JSON.stringify(courses, null, 2));
        return res.json(courses)
    }
    async update(req, res) {
        const {title,count}=req.body
        const courses = await Students.update({
            'count': count,
          },
          {include: [
            {
              model: models.Courses,attributes: ['title'],
            },
            {
                model: models.DateTable,
                //attributes: ['id','date'],
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
        ]},
          {
            where: {
              'id': id,
            },
          })




          ///////////ПОСЛЕ ОБНОВЛЕНИЯ НАДО ПЕРЕРАСЧИТЫВАТЬ МЕСТА И ПОЛУЧАЮЩИХ///////////////////////////////////////////////////////////////////////////////////////
          calculateRatingController.calculation();

        //console.log(JSON.stringify(courses, null, 2));
        return res.json(courses)
    }
    
    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports = new RatingCountController()