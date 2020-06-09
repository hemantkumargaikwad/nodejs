const axios = require('axios')
const moment = require('moment')
const OTP = require('../model/otp')
const { generateOTP } = require('../utils/common')

exports.sendOtp = async (req, res) => {
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
      otp: otp
    })
    try {
        await otpPayload.save()
        return res.status(200).send({})
    } catch (e) {
      return res.status(400).send(e)
    }
  }
}
