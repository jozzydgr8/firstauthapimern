const express = require('express');
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')

//body-parser
app.use(express.json())
//Route
app.use('/api/info/', require('./Route/route'));
app.use('/api/user/', require('./Route/user'))

//connect db
mongoose.connect(process.env.db)
.then(()=>{
    //init app
        app.listen(process.env.PORT,()=>{
            console.log(`db connected and server listed at ${process.env.PORT}`)
        })
})
.catch(error=>{
    console.log(error)
})
