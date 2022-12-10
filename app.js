require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 5000

//Database Connection
require('./config/database')

//Middleware
app.set('view engine','ejs')
app.use(expressLayouts);
app.set('layout','layouts/layout')
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(methodOverride('_method'));



//Routes
app.use('',require('./routes/todo'))



//Start server
app.listen(PORT,()=>{
    console.log(`Listening at http://localhost:${PORT}`)
})