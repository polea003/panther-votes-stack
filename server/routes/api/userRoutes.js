const express = require('express')
const router = express.Router()
const {registerUser, loginUser, GetMe} = require('../../controllers/userController')

const {protect} = require('../../middleware/authMiddleware')

router.post('/user', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, GetMe)

module.exports = router