const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db2");
var storage = new GridFsStorage({
  url: 'mongodb+srv://panther123:panther123@panther-db.gfe61.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/PNG"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${file.originalname}`;
      return filename;
    }
    return {
      bucketName: dbConfig.imgBucket,
      filename: `${file.originalname}`
    };
  }
});
var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;