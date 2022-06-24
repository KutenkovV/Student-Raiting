const models = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require("path");
const { Op } = require("sequelize");

class ListLoadController {
  async loadAll(req, res) {
    //что то похожее на загрузку файла

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
      return;
    }

    sampleFile = req.files.file;

    uploadPath = "./uploads/" + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      console.log("File uploaded to " + uploadPath);
    });

    console.log(path.resolve("../server/uploads/" + sampleFile.name));

    //что то похожее на запуск exe файла
    const { execFile } = require("child_process");
    execFile(
      path.resolve(
        "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe"
      ),
      ["-s", path.resolve("../server/uploads/" + sampleFile.name)],
      (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.log(err);
          res.status(400).send("node couldnt execute the command");
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        res.send("ОК");
      }
    );

    ListLoadController.selectionBooleanVariables();
  }
  async loadFree(req, res) {
    //что то похожее на загрузку файла

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
      return;
    }

    //console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.file;

    uploadPath = "./uploads/" + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      console.log("File uploaded to " + uploadPath);
    });

    console.log(path.resolve("../server/uploads/" + sampleFile.name));

    //что то похожее на запуск exe файла
    const { execFile } = require("child_process");
    execFile(
      path.resolve(
        "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe"
      ),
      ["-f", path.resolve("../server/uploads/" + sampleFile.name)],
      (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.log(err);
          res.status(400).send("node couldnt execute the command");
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        res.send("ОК");
      }
    );
    
    ListLoadController.selectionBooleanVariables();
  }
  async loadVacation(req, res) {
    //что то похожее на загрузку файла

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
      return;
    }

    //console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.file;

    uploadPath = "./uploads/" + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      console.log("File uploaded to " + uploadPath);
    });

    console.log(path.resolve("../server/uploads/" + sampleFile.name));

    //что то похожее на запуск exe файла
    const { execFile } = require("child_process");
    execFile(
      path.resolve(
        "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe"
      ),
      ["-v", path.resolve("../server/uploads/" + sampleFile.name)],
      (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.log(err);
          res.status(400).send("node couldnt execute the command");
          return;
        } else {
          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          res.send("ОК");
        }
      }
    );
    ListLoadController.selectionBooleanVariables();
  }
  async loadSad(req, res) {
    //что то похожее на загрузку файла

    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("No files were uploaded.");
      return;
    }

    //console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.file;

    uploadPath = "./uploads/" + sampleFile.name;

    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      console.log("File uploaded to " + uploadPath);
    });

    console.log(path.resolve("../server/uploads/" + sampleFile.name));

    //что то похожее на запуск exe файла
    const { execFile } = require("child_process");
    execFile(
      path.resolve(
        "../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe"
      ),
      ["-g", path.resolve("../server/uploads/" + sampleFile.name)],
      (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.log(err);
          res.status(400).send("node couldnt execute the command");
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        res.send("ОК");
      }
    );
    ListLoadController.selectionBooleanVariables();
  }

  static async selectionBooleanVariables () {
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

    for (let i = 0; i < list.length; i++) {
      for (let y = 0; y < listSAD.length; y++) {
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
      for (let y = 0; y < listVacation.length; y++) {
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
      for (let y = 0; y < listFree.length; y++) {
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
