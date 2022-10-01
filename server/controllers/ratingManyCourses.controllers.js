const models = require("../models/models");
const sequelize = require("../db");
const { Sequelize } = require("sequelize");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const CalculateRatingController = require("./calculateRating.controllers");
const ModelService=require("../service/model.service");

//класс отвечающий за студентов, которые подали на несколько направлений
class RatingManyCoursesController {

  //метод ,который возвращает студентов,которые подали на несколько направлений
  async getStudentRatingManyCourses(req, res) {
  
    try {
      var result = [];

      const listStudent = await sequelize.query(
        `		   
        SELECT sr.studentid, s.studnumber , s.fullname , s.educationgroup , s.institute
        FROM studentsrating sr
        left JOIN students s ON s.id = sr.studentid
        where sr.destination = true
        group by sr.studentid,s.studnumber , s.fullname,s.educationgroup , s.institute
        HAVING
          COUNT (*) > 1
      `);

      const listCourse = await sequelize.query(
        `WITH result as (
          SELECT sr.studentid, s.studnumber , s.fullname , s.educationgroup , s.institute
                FROM studentsrating sr
                left JOIN students s ON s.id = sr.studentid
                where sr.destination = true
                group by sr.studentid,s.studnumber , s.fullname,s.educationgroup , s.institute
                HAVING
                  COUNT (*) > 1
        )
              
        SELECT sr.studentid, sr.destination, courses.title ,r.points
                  FROM studentsrating sr
              LEFT JOIN result ON result.studentid = sr.studentid
              LEFT JOIN students s ON s.id = sr.studentid
                  LEFT JOIN rating r ON r.id = sr.reatingid
                  LEFT JOIN ratingcourses rc ON rc.id = r.ratingcoursesid
                  LEFT jOIN courses ON courses.id = rc.courseid
                  where sr.studentid = result.studentid  `
      );

      listStudent[0].forEach((item) => {
          var stud = {
            id: item.studentid,
            studnumber: item.studnumber,
            fullname: item.fullname,
            educationgroup: item.educationgroup,
            institute: item.institute,
            nid: {
              point: 0,
              destination: false,
            },
            od: {
              point: 0,
              destination: false,
            },
            sd: {
              point: 0,
              destination: false,
            },
            ktd: {
              point: 0,
              destination: false,
            },
            ud: {
              point: 0,
              destination: false,
            },
          };
         
          listCourse[0].forEach((itemCourse,index,array) => {
            if (itemCourse.studentid==item.studentid) {
              switch (itemCourse.title) {
                case 'НИД':
                  stud.nid.point = itemCourse.points;
                  stud.nid.destination = itemCourse.destination;
                  break;
                case 'КТД':
                  stud.ktd.point = itemCourse.points;
                  stud.ktd.destination = itemCourse.destination;
                  break;
                case 'ОД':
                  stud.od.point = itemCourse.points;
                  stud.od.destination = itemCourse.destination;
                  break;
                case 'СД':
                  stud.sd.point = itemCourse.points;
                  stud.sd.destination = itemCourse.destination;
                  break;
                case 'УД':
                  stud.ud.point = itemCourse.points;
                  stud.ud.destination = itemCourse.destination;
                  break;
              }
            } else {
              return;
            }
          })
        
        result.push(stud);
      });
      
      return res.json(result);
    } catch (error) {
      return res.send(error);
    }
  }

  async updateStudentRatingManyCourses(req, res) {
    if (!req.body) return response.sendStatus(400);
    try {
      await sequelize.query(
        `		   
        WITH t as (
          SELECT sr.id, courses.title 
          FROM studentsrating sr
          LEFT JOIN rating r ON r.id = sr.reatingid
          LEFT JOIN ratingcourses rc ON rc.id = r.ratingcoursesid
          LEFT jOIN courses ON courses.id = rc.courseid
          where sr.studentid = ?
        ) 
        UPDATE studentsrating
        SET 
        destination = CASE WHEN t.title = ? THEN True ELSE False END,
        cause = 'Другое направление' 
        FROM t
        WHERE studentsrating.id = t.id
      `,
      {
        replacements: [req.body.id,req.body.course],
        type: Sequelize.QueryTypes.SELECT,
      } 
      );
      const listCourse = await sequelize.query(
        `		   
        SELECT courses.id 
          FROM studentsrating sr
          LEFT JOIN rating r ON r.id = sr.reatingid
          LEFT JOIN ratingcourses rc ON rc.id = r.ratingcoursesid
          LEFT jOIN courses ON courses.id = rc.courseid
          where sr.studentid = ? and destination=false
      `,
      {
        replacements: [req.body.id],
        type: Sequelize.QueryTypes.SELECT,
      } 
      );
      
      listCourse[0].forEach(async (item) => {
        const point = await sequelize.query(
          `		   
          SELECT max(r.points)
            FROM studentsrating sr
            LEFT JOIN students s ON s.id = sr.studentid
            LEFT JOIN rating r ON r.id = sr.reatingid
            LEFT JOIN ratingcourses rc ON rc.id = r.ratingcoursesid
            LEFT jOIN courses ON courses.id = rc.courseid
            where courses.id = ? and sr.destination=false and s.sad=true and s.vacation=false and s.free=false
        `,
        {
          replacements: [item.id],
          type: Sequelize.QueryTypes.SELECT,
        } 
        );

        const listId = await sequelize.query(
          `		   
          select sr.id from studentsrating sr
            LEFT JOIN students s ON s.id = sr.studentid
            LEFT JOIN rating r ON r.id = sr.reatingid
            LEFT JOIN ratingcourses rc ON rc.id = r.ratingcoursesid
            LEFT jOIN courses ON courses.id = rc.courseid
            where courses.id = ? and sr.destination=false and s.sad=true and s.free=false and r.points>=?
        `,
        {
          replacements: [item.id,point],
          type: Sequelize.QueryTypes.SELECT,
        } 
        );
  
        listId[0].forEach(async (itemId) => {
          await sequelize.query(
            `		   
            UPDATE studentsrating
            SET 
            destination = True ,
            cause = ''
            WHERE studentsrating.id = ?
          `,
          {
            replacements: [itemId],
            type: Sequelize.QueryTypes.SELECT,
          } 
          );
        })
      })

      return res.send("OK");
    } catch (error) {
      return res.send(error);
    }
  }
}

module.exports = new RatingManyCoursesController();
