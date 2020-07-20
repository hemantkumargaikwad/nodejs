const axios = require('axios')
const moment = require('moment')
const OTP = require('../model/otp')
const User = require('../model/user')
const { generateOTP, isOtpExprired } = require('../utils/common')

exports.sendOtp = async (req, res) => {
  const registeredUser = await User.find({ mobile: req.body.mobile })
  if (registeredUser.length) {
    const user = registeredUser[0]
    return res.status(200).json({
      status: 200,
      msg: 'success',
      data: {
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  }
  const otp = generateOTP()
  const day = moment().format('DD-MM-YYYY')
  const message = `The OTP is ${otp} to confirm your appointment at Shree Salon on ${day} ${req.body.preferredTime}. Thank you ${req.body.firstName} for giving a chance to serve you.`
  const encodedMessage = encodeURI(message)
  // const api = `http://t.askspidy.com/sendhttp.php?authkey=186432Aas8X762aV85a2258f8&mobiles=${req.body.mobile}&message=${encodedMessage}&sender=SRESLN&route=4`
  const result = await setTimeout(() => {
    return otp
  })
  if (result) {
    const otpPayload = new OTP({
      mobile: req.body.mobile,
      otp: otp,
      isExpired: false
    })
    try {
      const result = await otpPayload.save()
      return res.status(200).send({ status: 200, msg: 'success', data: { otp } })
    } catch (e) {
      return res.status(400).send(e)
    }
  }
}

exports.validateOtp = async (req, res) => {
  // const mobileExist = await OTP.findAll({ where: { mobile: req.body.mobile }})
  try {
    const mobileExist = await OTP.find({ mobile: req.body.mobile, otp: req.body.otp })
    const verifiedMobileData = mobileExist.length && mobileExist[0]
    if (verifiedMobileData._id) {
      if (isOtpExprired(verifiedMobileData)) {
        const result = await OTP.updateOne(
          { _id: verifiedMobileData._id },
          { $set: { isExpired: true } },
          { new: true }
        )
        if (result) {
          return res.status(200).json({ status: 200, msg: 'success' })
        } else {
          return res.status(200).json({ status: 401 })
        }
      } else {
        await OTP.updateOne(
          { _id: verifiedMobileData._id },
          { $set: { isExpired: true } },
          { new: true }
        )
        return res
          .status(401)
          .json({ status: 401, msg: 'OTP is expired. Please re-generate OTP' })
      }
    } else {
      return res.status(201).json({ msg: 'Invalid OTP, Please re-enter.' })
    }
  } catch (e) {
    res.status(401).json({ msg: e.message })
  }
}
