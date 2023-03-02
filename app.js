var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
const passport = require('passport');
const avisRoute = require("./routes/avis");
const serviceRoute = require("./routes/services");
const messageRoute = require('./routes/message')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', avisRoute);
app.use('/', serviceRoute);
app.use('/', messageRoute);



// Passport
app.use(passport.initialize())
require('./security/passport')(passport)




// Connect To db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to db"))
.catch(err => console.log(err))
app.use('/api', indexRouter);



module.exports = app;
