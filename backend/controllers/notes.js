const mongoose = require('mongoose')
const Note = require('../model/Note')
const User = require('../model/User')
const asyncHandler = require('express-async-handler')

const getAllNotes = (async (req, res) => {
    const notes = await Note.find().lean()
    if (!notes?.length) {
        return res.status(400).json({ message: "Empty notes."})
    }

    const notesWithUser = await Promise.all(notes.map(async note => {
        const user = await User.findById(note.user).select('-pswd').lean().exec()
        return { ...note, user }
    }))

    res.json(notesWithUser)
})

const addNote = asyncHandler(async (req, res) => {
    const { user, title, content } = req.body

    if (!user || !content) {
        return res.status(400).json({
            message: "All fields are required!"
        })
    }

    const note = await Note.create({
        user, title: title.trim(), content: content.trim()
    })

    if (note) {
        res.status(201).json({
            message: "Note saved!"
        })
    } else {
        res.status(400).json({
            message: "Uh, oh! Invalid note data recieved."
        })
    }

    
})

const editNote = asyncHandler(async (req, res) => {
    const { id, user, title, content, completed } = req.body

    if (!id || !user || !content || typeof completed !== 'boolean') {
        return res.status(400).json({
            message: "Note not saved! All fields are reqruired."
        })
    }

    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(404).json({
            message: "Note not found."
        })
    }

    if (note.id !== id) {
        return res.status(401).json({
            message: "You can't edit note ID."
        })
    }

    note.title = title.trim()
    note.content = content.trim()
    note.completed = completed

    await note.save()

    res.json({ mesaage: "Note Edited!" })
})

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({
            message: "Note ID is required."
        })
    }

    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({
            message: "Note does not exist."
        })
    }

    await note.deleteOne()
    res.json({
        message: "Note deleted!"
    })
})

module.exports = {
    addNote, editNote,
    deleteNote, getAllNotes
}