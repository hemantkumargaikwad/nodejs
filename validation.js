//Validation
const Joi = require('@hapi/joi')
//Register validation 
exports.registerValidation = (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(5).email(),
        mobile: Joi.string().min(10).required(),
        appointmentFor: Joi.string(),
        preferredTime: Joi.string(),
        status: Joi.string()
    })
    return schema.validate(data)
}
exports.loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(data)
}
