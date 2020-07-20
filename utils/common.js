const moment = require('moment')

exports.generateOTP = () => {
  const digits = '112233445566778899'
  let OTP = ''
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }
  return OTP
}

exports.isOtpExprired = (verifiedMobileData) => {
  const date = new Date()
  const epochDateTime = date.getTime()
  const epochCreatedDateTime = verifiedMobileData.createdDate.getTime()
  const currentTime = moment.unix(moment().format())
  const difference = epochDateTime - epochCreatedDateTime
  const minutes = moment.duration(difference).asMinutes()
  if(minutes <= 30){
      return true
  }
  return false
}
