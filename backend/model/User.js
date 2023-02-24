const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    pswd: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    },
    creationDate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('User', userSchema)