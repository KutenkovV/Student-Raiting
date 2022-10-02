const models = require("../models/models");
const { Op } = require("sequelize");


//красиво модель подключить
const includeModel = (model, params) => ({ model, ...params })

//---------------------------------------------------------------------------------------------------------------------------

//часто повторяющиеся запросы
const getDateTableIdAndDate = {
  model: models.DateTable,
  attributes: ["id", "date"],
  required: true,
  where: {
    date: {
      [Op.contains]: [
        { value: new Date(), inclusive: true },
        { value: new Date(), inclusive: true },

      ],
    },
  },
}

//---------------------------------------------------------------------------------------------------------------------------

//запросы с некоторыми уникальными свойствами
function getCoursesByTitle(title, include=[], attributes =[]) {
  return includeModel(models.Courses, {
    attributes: attributes,
    include:include,
    where: {
      title: title,
    }
  })
}

function getRatingCourses(include){
  return includeModel(models.RatingCourses, {
    required:true,
    include:include
  })
}

function getRating(include, attributes=[]){
  return includeModel(models.Rating, {
    required:true,
    attributes:attributes,
    include:include
  })
}

//---------------------------------------------------------------------------------------------------------------------------

module.exports = {
  getDateTableIdAndDate,
  getCoursesByTitle,
  getRatingCourses,
  getRating,
  includeModel
}
