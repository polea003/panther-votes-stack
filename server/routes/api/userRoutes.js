const express = require('express')
const router = express.Router()
const {registerUser, loginUser, GetMe, SubmitElection, reload, UpdateE} = require('../../controllers/userController')
const homeController = require("../../controllers/home");
const uploadController = require("../../controllers/upload");
const {protect} = require('../../middleware/authMiddleware')

router.post('/user', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, GetMe)
router.post('/reload', reload)
router.put('/Election:Uid/:EID', SubmitElection)
router.get("/UpdateE:id", UpdateE)
router.post("/upload", uploadController.uploadFiles);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);

module.exports = router