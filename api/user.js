const User = require('../model/user')
const bcrypt = require('bcryptjs')
const {registerValidation } = require('../validation')

exports.userRegistration = async (res, req) => {
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
}