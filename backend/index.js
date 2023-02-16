require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

const connectDB = require('./config/dbConn')

const app = express()
const PORT = process.env.PORT

connectDB()
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: ['http://localhost:3500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.get('^/$|i/ndex(.html)', (req, res) => {
    res.status(200).json({ message: 'Successful! '})
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
        console.log(`Server is running at PORT: ${PORT}`)
    })
})