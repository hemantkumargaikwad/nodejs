const router = require('express').Router();
const userApi = require('../api/user')
const authApi = require('../api/auth')
const otpApi = require('../api/sendOtp')
const bcrypt = require('bcryptjs')


router.post('/register', userApi.userRegistration)
router.post('/getOtp', otpApi.sendOtp)
router.post('/validate', otpApi.validateOtp)
router.post('/login', authApi.login)
module.exports = router