const allowedLists = require('./allowedList')

const corsOptions = {
    origin: allowedLists,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}

module.exports = corsOptions