const User = require('../model/appointments')
const {registerValidation } = require('../validation')

exports.userRegistration = async (req, res) => {
    /**
     * Validation before user creation
     */
    const { error } = registerValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    /**
     * Duplicate mobile check
     */
    // const mobileExist = await User.findOne({ mobile: req.body.mobile })
    // console.log('mobileExist', mobileExist)
    // if(mobileExist) return res.status(400).send({error:'Email already exist', obj: mobileExist})

    /**
     * Hashing Password
     */
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt)
    /**
     * New User registration
     */
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        birthDate: req.body.birthDate,
        appointmentFor: req.body.appointmentFor,
        preferredTime: req.body.preferredTime
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