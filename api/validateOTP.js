const axios = require('axios')
const moment = require('moment')
const OTP = require('../model/otp')
const User = require('../model/user')

exports.validateOtp = async (req, res) => {
  const mobileExist = await OTP.findOne({ mobile: req.body.mobile })
  const currentTime = moment.utc().format();
  const isValid = moment.unix(currentTime) - moment.unix(mobileExist.createdDate);
  if(currentTime)
  if (mobileExist) {
    if (mobileExist.otp === req.body.otp) {
      return res.status(200)
    }
  }
  return res.status(201)
}
