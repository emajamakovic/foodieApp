const express = require('express')

// controller functions
const { signupUser, loginUser,getUserByEmail } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.get('/byemail/:email', getUserByEmail)

module.exports = router