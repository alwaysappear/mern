const express = require('express')
const router = express.Router()

router.get('^/$|/index(.html)?', (req, res) => {
    return res.status(200).json({
        message: "Home page."
    })
})

module.exports = router