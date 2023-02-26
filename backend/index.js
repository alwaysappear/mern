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
app.use(errHandler)
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Page not found!'})
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB!')
    app.listen(PORT, () => {
        console.log(`Server is running. Navigate to http://localhost:${PORT}`)
    })
})