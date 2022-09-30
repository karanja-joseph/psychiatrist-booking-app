const express = require('express')
const app = express();

require('dotenv').config()
const dbSetup = require('./dbSetup')

const PORT = process.env.PORT || 5000;
// console.log(process.env.DB_URL);

app.listen(PORT, () => console.log(`Server runs on port ${PORT} !`))