const models = require("../models/models");
const ApiError = require("../error/ApiError");
const path = require('path')
const { Op } = require("sequelize");

class ListLoadController {
  async loadAll(req, res) {
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
  
      console.log('File uploaded to ' + uploadPath);
    });
    
    console.log(path.resolve('../server/uploads/'+sampleFile.name));

    //что то похожее на запуск exe файла
    const { execFile  } = require("child_process");
    execFile(path.resolve('../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe'), ['-s',path.resolve('../server/uploads/'+sampleFile.name)], (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log(err);
        res.status(400).send('node couldnt execute the command');
        return;
      }
      res.send('ОК');
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    
  }
  async loadFree(req, res){
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
  
      console.log('File uploaded to ' + uploadPath);
    });
    
    console.log(path.resolve('../server/uploads/'+sampleFile.name));

    //что то похожее на запуск exe файла
    const { execFile  } = require("child_process");
    execFile(path.resolve('../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe'), ['-f',path.resolve('../server/uploads/'+sampleFile.name)], (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log(err);
        res.status(400).send('node couldnt execute the command');
        return;
      }
      res.send('ОК');
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    

  }
  async loadVacation(req, res){
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
  
      console.log('File uploaded to ' + uploadPath);
    });
    
    console.log(path.resolve('../server/uploads/'+sampleFile.name));

    //что то похожее на запуск exe файла
    const { execFile  } = require("child_process");
    execFile(path.resolve('../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe'), ['-v',path.resolve('../server/uploads/'+sampleFile.name)], (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log(err);
        res.status(400).send('node couldnt execute the command');
        return;
      }
      res.send('ОК');
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    
  }
  async loadSad(req, res){
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
  
      console.log('File uploaded to ' + uploadPath);
    });
    
    console.log(path.resolve('../server/uploads/'+sampleFile.name));

    //что то похожее на запуск exe файла
    const { execFile  } = require("child_process");
    execFile(path.resolve('../server/parserApp/parserApp/bin/Debug/net6.0/parserApp.exe'), ['-g',path.resolve('../server/uploads/'+sampleFile.name)], (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log(err);
        res.status(400).send('node couldnt execute the command');
        return;
      }
      res.send('ОК');
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    
  }
}

module.exports = new ListLoadController();
