const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Accecc denied')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        res.user = verified
        next()
    } catch(err){
        res.status(400).send('Invalid token')
    }
}