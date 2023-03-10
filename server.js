const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require('./config/database')
const mainRoute = require('./routes/main')

require('dotenv').config({path:`./config/.env`})

// connectDB()
connectDB()

app.set('view engine', 'ejs')

require('./config/passport')(passport)




// Body Parsing
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(logger("dev"));

// Setup Sessions - stored in MongoDB
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );

app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());


app.use('/', mainRoute)

app.listen(process.env.PORT, ()=>{
    console.log('we are listening')
})