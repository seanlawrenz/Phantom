'use strict';

	var config = require('./config'),
	  	  http = require('http'),
   	   express = require('express'),
      compress = require('compression'),
   	   session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
methodOverride = require('method-override'),
	  passport = require('passport'),
	    morgan = require('morgan'),
	bodyParser = require('body-parser'),
		 flash = require('connect-flash');

module.exports = function(db){
	var app = express();
	var server = http.createServer(app);

	//Development status
	if(process.env.NODE_ENV === 'development'){
		//Console logger
		app.use(morgan('dev'));
	}else if(process.env.NODE_ENV === 'production'){
		//Compression of HTTP requests
		app.use(compress());
	}

	//Middlewear
	//Body-Parser extract the entire body portion of an incoming request to make the res.body easier to handle
	app.use(bodyParser.urlencoded({
		extended:true
	}));
	app.use(bodyParser.json());
	//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
	app.use(methodOverride);

	// Configure the MongoDB session storage
	var mongoStore = new MongoStore({
		mongooseConnection: db.connection,
        collection: config.sessionCollection
	});

	//Bridge between Express and connect-mongo
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	//Session handler
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	//VIEWS
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Load the 'index' routing file
	require('../app/routes/index.server.routes.js')(app);
	//Load the 'users' routing file
	require('../app/routes/users.server.routes.js')(app);
	//Load the 'posts' routing file
	require('../app/routes/posts.server.routes.js')(app);

	//Load static files
	app.use(express.static('./public'));

	return server;

}