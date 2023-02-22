const express = require('express')
const router = express.Router()
const {
    getAllUsers, updateUser,
    createNewUser, deleteUser
} = require('../controllers/users')

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router