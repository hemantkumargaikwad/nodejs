const router = require('express').Router();
const userApi = require('../api/user')
const authApi = require('../api/auth')
const bcrypt = require('bcryptjs')


router.post('/register', userApi.userRegistration)
router.post('/login', authApi.login)
module.exports = router