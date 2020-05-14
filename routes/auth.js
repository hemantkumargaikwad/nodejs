const router = require('express').Router();
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation')

router.post('/register', async(req, res) => {
    /**
     * Validation before user creation
     */
    const { error } = registerValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    /**
     * Duplicate email check
     */
    const emailExist = await User.findOne({ email: req.body.email })
    if(emailExist) return res.status(400).send('Email already exist')

    /**
     * Hashing Password
     */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    /**
     * New User registration
     */
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    }) 
    try {
        await user.save()
        res.send({ user: user._id})
    } catch(e) {
        res.status(400).send(e)
    }
    user.save()
    res.send('Register Route')
})
router.post('/login', async(req, res) => {
    /**
     * Validation before user login
     */
    const { error } = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    /**
     * Is email exist
     */
    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).send('Email is not registered')
    /**
     * Validate password 
     */
    const isValidPass = await bcrypt.compare(req.body.password, user.password)
    if(!isValidPass) return res.status(400).send('Email or password is wrong')

    /**
     * Create and assign token
     */
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
    res.send("Logged In")
})
module.exports = router