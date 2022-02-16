const express = require('express')
const router = express.Router()
const {registerUser, loginUser, GetMe} = require('../../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', GetMe)

module.exports = router