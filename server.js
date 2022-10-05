const express = require('express')
const app = express();

require('dotenv').config()
const dbSetup = require('./dbSetup')
const patientRoute = require('./routes/patientRoute')

const PORT = process.env.PORT || 5000;
// console.log(process.env.DB_URL);

app.use(express.json())
app.use('/api/patient', patientRoute)

app.listen(PORT, () => console.log(`Server runs on port ${PORT} !`))