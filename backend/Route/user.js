const router = require('express').Router()
const {signUp, logIn} = require('../Controller/userController')



//login route

router.post('/login', logIn)

//signup route
router.post('/signup', signUp)

module.exports = router