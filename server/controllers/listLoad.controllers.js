const models = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class ListLoadController {
  async load(req, res) {
    //что то похожее на загрузку файла

    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
  
    //console.log('req.files >>>', req.files); // eslint-disable-line
  
    sampleFile = req.files.file;
     
    uploadPath = './uploads/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.send('File uploaded to ' + uploadPath);
    });

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

    //return res;
  }
}

module.exports = new ListLoadController();
