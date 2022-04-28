const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class ListLoadController {
  async load(req, res) {
    //по идее тут надо загружать список и запускать парсер
    //что то похожее на загрузку файла
    /*const result = await models.StudentsRating.findAll();
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", function (fieldname, file, filename) {
      console.log("Uploading: " + filename);
      //Path where image will be uploaded
      fstream = fs.createWriteStream(__dirname + "/img/" + filename);
      file.pipe(fstream);
      fstream.on("close", function () {
        console.log("Upload Finished of " + filename);
        res.redirect("back"); //where to go next
      });
    });*/

    //что то похожее на запуск exe файла
    /*const { exec } = require("child_process");
    exec("cat *.js bad_file | wc -l", (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });*/

    return res.json(result);
  }
}

module.exports = new ListLoadController();