const models = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path");
const { Op } = require("sequelize");

//Класс отвечающий за загрузку файлов и последующий запуск парсера
//Файлы загружаются в папку uploads
//Перед запуском проекта обязательно собрать и запустить один раз парсер(что бы получился файл exe),который находится в папке parserApp

class ListLoadController {
  
  async loadCourses(req, res) { 
    //загрузка файлов по направлениям
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
      return;
    }

    let file=req.files.file;
    let uploadPath ="./uploads/" + file.name;

    //перемещаем файл из запроса в папку uploads
    file.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    //запуск exe файла парсера
    const { execFile } = require("child_process");
    execFile(
      //путь к файлу exe
      path.resolve(
        "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe"
      ),
      //ключ + сам файл excel
      ["-s", path.resolve("../server/uploads/" + file.name)],
      (err, stdout, stderr) => {
        if (err) {
          res.status(400).send("node couldnt execute the command");
          return;
        }
        res.send("ОК");
      }
    );

    //обновляем значения 
    ListLoadController.updateFreeVacationSAD();
  }
  //метод загрузки файлов по направлениям
  async loadFree(req, res) {
   
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
      return;
    }
    let file=req.files.file;
    let uploadPath ="./uploads/" + file.name;

    //перемещаем файл из запроса в папку uploads
    file.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    //запуск exe файла парсера
    const { execFile } = require("child_process");
    execFile(
      //путь к файлу exe
      path.resolve(
        "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe"
      ),
      //ключ + сам файл excel
      ["-f", path.resolve("../server/uploads/" + file.name)],
      (err, stdout, stderr) => {
        if (err) {
          res.status(400).send("node couldnt execute the command");
          return;
        }
        res.send("ОК");
      }
    );

    //обновляем значения 
    ListLoadController.updateFreeVacationSAD();
  }
  //метод загрузки файла с номерами студентов находящихся на каникулах
  async loadVacation(req, res) {
    
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
      return;
    }
    let file=req.files.file;
    let uploadPath ="./uploads/" + file.name;

    //перемещаем файл из запроса в папку uploads
    file.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    //запуск exe файла парсера
    const { execFile } = require("child_process");
    execFile(
      //путь к файлу exe
      path.resolve(
        "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe"
      ),
      //ключ + сам файл excel
      ["-v", path.resolve("../server/uploads/" + file.name)],
      (err, stdout, stderr) => {
        if (err) {
          res.status(400).send("node couldnt execute the command");
          return;
        } else {
          res.send("ОК");
        }
      }
    );
    //обновляем значения 
    ListLoadController.updateFreeVacationSAD();
  }
  //метод загрузки файла с номерами студентов получающих ГАС
  async loadSad(req, res) {
    
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
      return;
    }
    let file=req.files.file;
    let uploadPath ="./uploads/" + file.name;

    //перемещаем файл из запроса в папку uploads
    file.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    //запуск exe файла парсера
    const { execFile } = require("child_process");
    execFile(
      //путь к файлу exe
      path.resolve(
        "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe"
      ),
      //ключ + сам файл excel
      ["-g", path.resolve("../server/uploads/" + file.name)],
      (err, stdout, stderr) => {
        if (err) {
          res.status(400).send("node couldnt execute the command");
          return;
        }
        res.send("ОК");
      }
    );
     //обновляем значения 
    ListLoadController.updateFreeVacationSAD();
    console.log("Загрузка завершена")

      //получаем все заявки студентов на текущий период
    const list = await models.StudentsRating.findAll({
      attributes: ["id", "destination"],
      required: true,
      include: [
        {
          model: models.Students,
          attributes: ["id", "studnumber","sad","free","vacation"],
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
    console.log(list)
  }

  //метод обновления полей каникулы,свободный график и ГАС после загрузки любого списка
  static async updateFreeVacationSAD () {
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
