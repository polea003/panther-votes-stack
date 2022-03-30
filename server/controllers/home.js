
const path = require("path");
const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}../../voting-frontend/src/views/UploadPicture.vue`));
};
module.exports = {
  getHome: home
};