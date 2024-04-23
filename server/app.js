const express = require('express')
const app = express()
const staticRoute = require('./routes/staticRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {checkAuth} = require('./middleware/authentication')
const mongoose = require('mongoose')
const PORT = 5000

mongoose.connect("mongodb://127.0.0.1:27017/notes")
.then(()=> console.log("MongoDB Connected"))

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors())

// app.use(checkAuth())

app.use('/', staticRoute);

app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))