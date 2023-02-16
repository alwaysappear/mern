require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

const connectDB = require('./config/dbConn')
const corsOptions = require('./config/corsOptions')
const errHandler = require('./middlewares/errHandler')

const app = express()
const PORT = process.env.PORT

connectDB()
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))

app.use(errHandler)

app.get('^/$|i/ndex(.html)', (req, res) => {
    res.status(200).json({ message: 'Successful! '})
})

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Page not found!'})
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
        console.log(`Server is running at PORT: ${PORT}`)
    })
})