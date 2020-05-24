const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { loginValidation } = require('../validation')

exports.login = async(req, res) => {
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
}