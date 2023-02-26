const express = require('express')
const router = express.Router()
const { addNote, editNote,
    deleteNote, getAllNotes } = require('../controllers/notes')

router.route('/')
    .get(getAllNotes)
    .post(addNote)
    .patch(editNote)
    .delete(deleteNote)

module.exports = router