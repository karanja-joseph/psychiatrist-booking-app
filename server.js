const express = require('express')
const cors = require('cors')
const app = express();

require('dotenv').config()
const dbSetup = require('./dbSetup')
const psychiatristRoute = require('./routes/psychiatristRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const path = require("path");

const PORT = process.env.PORT || 5000;
// console.log(process.env.DB_URL);

app.use(cors())
app.use(express.json())
app.use('/api/user', userRoute)
app.use('/api/psychiatrist', psychiatristRoute)
app.use('/api/admin', adminRoute)

app.listen(PORT, () => console.log(`Server runs on port ${PORT} !`))