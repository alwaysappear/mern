const bcrypt = require('bcrypt')
const Note = require('../model/Note')
const User = require('../model/User')
const asyncHandler = require('express-async-handler')


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-pswd').lean()
    if (!users?.length) return res.status(400).json({ message: "Empty users." })
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

    const hashedPswd = await bcrypt.hash(password, 10)
    const user = await User.create({
        user: username,
        pswd: hashedPswd,
        roles
    })

    if (user) {
        res.status(201).json({
            message: `New user ${user.user} was created`
        })
    } else {
        res.status(404).json({
            message: "Invalid data recieved!"
        })     
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, roles, active } = req.body

    if (!id || !username || !password
        || !Array.isArray(roles) || !roles.length
        || typeof active !== 'boolean') {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
    
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({
            message: "User does not exist."
        })
    }

    const duplicate = await User.findOne({ user: username }).lean()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({
            message: "Username already exists"
        })
    }

    user.user = username
    user.roles = roles
    user.active = active

    if (password) {
        user.pswd = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({
        message: `New user ${updatedUser.user} updated successfully.`
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({
            message: "User ID is required!"
        })
    }

    const note = await Note.findOne({ user: id }).lean().exec()

    if (note) {
        return res.status(400).json({
            message: "Can't delete! User still have assigned note(s)."
        })
    }

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({
            message: "User not found!"
        })
    }

    const re = await user.deleteOne()
    res.json({
        message: `${re.user} has been deleted.`
    })
})

module.exports = {
    getAllUsers, updateUser,
    createNewUser, deleteUser
}