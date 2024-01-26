const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require("body-parser");

const app = express();

const connectDB=require('./server/database/connection')

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 3001

// log requests
app.use(morgan('tiny'));


//connection db
connectDB();

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))


// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true})) 

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/',require('./server/routes/routes'))

app.use('/html', express.static(path.resolve(__dirname, "../NODEJS/Frontend")))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});