const upload = require("../middleware/upload");
const dbConfig = require("../config/db2");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = 'mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const baseUrl = "http://localhost:8080/files/";
const mongodb = require('mongodb')
const mongoClient = new MongoClient(url);
const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    const db = await mongodb.MongoClient.connect
    ('mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    db.aggregate([
       { $addFields : {name: 1}}
    ])
    return res.send({
      message: "File has been uploaded.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};
const getListFiles = async (req, res) => {
    //console.log("hELLO")
  try {
    await mongoClient.connect();
    const database = mongoClient.db('myFirstDatabase');

    const images = database.collection('photos' + ".files");

    const cursor = images.find({});


    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }
    let fileInfos = [];
    await cursor.forEach((doc) => {

      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });
    //console.log(fileInfos)

    return res.status(200).send(fileInfos);
  } catch (error) {

    return res.status(500).send({ 
        
      message: error.message,
    });
  }
};
const download = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db('myFirstDatabase');
    const bucket = new GridFSBucket(database, {
      bucketName: "photos",
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = {
  uploadFiles,
  getListFiles,
  download,
};