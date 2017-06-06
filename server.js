'use strict'

//Declaring Developement enviorment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Load Modules
var mongoose = require('./config/mongoose'),
	 express = require('./config/express'),
	passport = require('./config/passport');

//New instance of Mongoose
var db = mongoose();
//New instance of Express
var app = express(db);
//New instance of Passport
var passport = passport();

//I'm going to work on my local server on port 3000
app.listen(3000);

//Express application instance for external usage
module.exports = app;

//Just so I know we're working
console.log('Server up and running on http://localhost:3000');
