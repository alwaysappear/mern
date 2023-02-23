const bcrypt = require('bcrypt')
const Note = require('../model/Note')
const User = require('../model/User')
const asyncHandler = require('express-async-handler')


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-pswd').lean()
    if (!users) return res.status(400).json({ message: "Users not found." })
    return res.status(200).json(users)
})

const createNewUser = asyncHandler(async (req, res) => {
    const {
        username,
        password,
        roles
    } = req.body
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({
            message: "All fields are required."
        })
    }

    const replicate = await User.findOne({
        user: username
    }).lean().exec()

    if (replicate) return res.status(409).json({
        message: "User already exists."
    })

    const hashedPswd = await bcrypt.hash(pswd, 10)
    const user = await User.create({
        user: username,
        pswd: hashedPswd,
        roles
    })

    if (user) {
        res.status(201).json({
            message: `New user ${user} was created`
        })
    } else {
        res.status(404).json({
            message: "Invalid data recieved!"
        })
    }
})

const updateUser = asyncHandler(async (req, res) => {
    
})

const deleteUser = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers, updateUser,
    createNewUser, deleteUser
}