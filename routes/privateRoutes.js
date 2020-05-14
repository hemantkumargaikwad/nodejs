const router = require('express').Router();
const { verifyToken } = require('./verifyToken')

router.get('/', verifyToken, (req, res)=>{
    res.json({
        posts: {
            title: "New Posts in private route",
            description: "This is the private route"
        }
    })
})

module.exports = router