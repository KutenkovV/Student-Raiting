const models = require("../models/models");
const ApiError = require("../error/ApiError");
const multer = require('multer');
const path = require("path");
const { Op } = require("sequelize");

//Класс отвечающий за загрузку файлов и последующий запуск парсера
//Файлы загружаются в папку uploads
//Перед запуском проекта обязательно собрать и запустить один раз парсер(что бы получился файл exe),который находится в папке parserApp


class ListLoadController {

  async loadFile(req, res) {
    if (!req.files || Object.keys(req.files.files).length === 0) {
      res.status(400).send("Не удалось загрузить файлы");
      return;
    }

    let files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    let message = [];

    for (let i = 0; i < files.length; i++) {

      let promises = []

      let uploadPath = "./uploads/" + files[i].name;
      //перемещаем файл из запроса в папку uploads
      files[i].mv(uploadPath, function (err) {
        if (err) {
          message.push({
            title: files[i].name,
            status: err
          })
        }
      });

      var key = "";
      switch (
      files[i].name
      ) {
        case "НИД.csv":
        case "КТД.csv":
        case "ОД.csv":
        case "СД.csv":
        case "УД.csv":
          key = "-s";
          break;
        case "Свободный график.csv":
          key = "-f";
          break;
        case "Каникулы.csv":
          key = "-v";
          break;
        case "ГАС.csv":
          key = "-g";
          break;
        default:

          message.push({
            title: files[i].name,
            status: "Проверьте название файла"
          });
          continue;
      }

      let promise = new Promise((resolve, reject) => {
        let m = {};
        //запуск exe файла парсера
        const { execFile } = require("child_process");
        execFile(
          //путь к файлу exe
          path.resolve(
            "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp"
          ),
          //ключ + сам файл excel
          [key, path.resolve("../server/uploads/" + files[i].name)],
          (err, stdout, stderr) => {
            console.log(stdout)
            if (err) {
              m = {
                title: files[i].name,
                status: err
              };
            }
            else {
              m = {
                title: files[i].name,
                status: "OK"
              };
            }
            resolve(m)
          }
        );
      })
      promises.push(promise) // будет ждать, пока промис не выполнится (*)
    }
    message = await Promise.All(promises)
    ListLoadController.updateFreeVacationSAD();
    res.send(message);
  }

  //метод обновления полей каникулы,свободный график и ГАС после загрузки любого списка
  static async updateFreeVacationSAD() {
    //получаем все заявки студентов на текущий период
    const list = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
      required: true,
      include: [
        {
          model: models.Students,
          attributes: ["id", "studnumber"],
        },
        {
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
        },
      ],
    });
    //получаем номера студентов которые сдают сессию согласно свободному графику
    const listFree = await models.StudentsFree.findAll({
      required: true,
      include: [
        {
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
        },
      ],
    });
    //получаем номера студентов которые находятся на каникулах
    const listVacation = await models.StudentsVacation.findAll({
      required: true,
      include: [
        {
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
        },
      ],
    });
    //получаем номера студентов которые получают ГАС 
    const listSAD = await models.StudentsSAD.findAll({
      required: true,
      include: [
        {
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
        },
      ],
    });
    //перебираем все заявки студентов на текущий период
    for (let i = 0; i < list.length; i++) {
      //перебираем номера студентов которые получают ГАС 
      for (let y = 0; y < listSAD.length; y++) {
        //если студент из списка заявок получает ГАС,то ставим ему значение true
        if (list[i].student.dataValues.studnumber == listSAD[y].studnumber) {
          await models.Students.update(
            { sad: true },
            {
              where: {
                id: list[i].student.dataValues.id,
              },
            }
          );
        }
      }
      //перебираем номера студентов которые находятся на каникулах
      for (let y = 0; y < listVacation.length; y++) {
        //если студент из списка заявок находится на каникулах,то ставим ему значение true
        if (list[i].student.dataValues.studnumber == listVacation[y].studnumber) {
          await models.Students.update(
            { vacation: true },
            {
              where: {
                id: list[i].student.dataValues.id,
              },
            }
          );
        }
      }
      //перебираем номера студентов которые сдают сессию согласно свободному графику
      for (let y = 0; y < listFree.length; y++) {
        //если студент из списка заявок сдает сессию согласно свободному графику,то ставим ему значение true
        if (list[i].student.dataValues.studnumber == listFree[y].studnumber) {
          await models.Students.update(
            { free: true },
            {
              where: {
                id: list[i].student.dataValues.id,
              },
            }
          );
        }
      }
    }
  }
}

module.exports = new ListLoadController();
