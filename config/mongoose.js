'use strict';

//Setting dependents
var config = require('./config'),
  mongoose = require('mongoose');

//Mongoose module
module.exports = function(){
	mongoose.Promise = global.Promise;
	var db = mongoose.connect(config.db);

	//Schemas
	//User Schema
	require('../app/models/user.server.model');
	require('../app/models/post.server.model');

	return db;
};