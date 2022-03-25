const express = require('express')
const router = express.Router()
const {registerUser, loginUser, GetMe, SubmitElection} = require('../../controllers/userController')
const homeController = require("../../controllers/home");
const uploadController = require("../../controllers/upload");
const {protect} = require('../../middleware/authMiddleware')

router.post('/user', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, GetMe)
router.put('/Election:Uid/:EID', SubmitElection)
router.post("/upload", uploadController.uploadFiles);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);

module.exports = router