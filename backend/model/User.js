const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2000
        },
        Admin: Number,
        Employee: Number,
        Manager: Number
    },
    creationDate: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.Model('userModel', userSchema)