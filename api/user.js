const axios = require('axios')
const User = require('../model/user')
const Appointments = require('../model/appointments')
const OTP = require('../model/otp')
const { generateOTP } = require('../utils/common')
const { sendOtp } = require('./sendOtp')
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../validation')

exports.userRegistration = async (req, res) => {
  /**
   * Validation before user creation
   */
  const { error } = registerValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  /**
   * Duplicate email check
   */
  const mobileExist = await User.findOne({ mobile: req.body.mobile })
  if (mobileExist) {
    const appointment = new Appointments({
      usedId: mobileExist.id,
      appointmentFor: req.body.appointmentFor,
      preferredTime: req.body.preferredTime,
      status: 'Pending'
    })
    try {
      const result = await appointment.save()
      return res.status(200).send({ status: 200, msg: 'success', data: { appointmentId: result.id } })
    } catch (e) {
      return res.status(400).send(e)
    }
  } else {
    /**
     * Hashing Password
     */
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    try {
      /**
       * New User registration
       */
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile
      })
      const appointment = new Appointments({
        usedId: mobileExist.id,
        appointmentFor: req.body.appointmentFor,
        preferredTime: req.body.preferredTime,
        status: 'Pending'
      })
      await appointment.save()
      await user.save()
      res.send({ user: user._id })
    } catch (e) {
      res.status(400).send(e)
    }
  }
}
