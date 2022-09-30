const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to Mongoose DB successfully"))

module.exports = mongoose 