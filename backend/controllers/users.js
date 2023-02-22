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
    
})

const updateUser = asyncHandler(async (req, res) => {

})

const deleteUser = asyncHandler(async (req, res) => {

})

module.exports = {
    getAllUsers, updateUser,
    createNewUser, deleteUser
}