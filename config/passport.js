'use strict';

var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function(){
	var User = mongoose.model('User');

	passport.serializeUser(function(user, done){
		//Saving id to session
		done(null, user.id);
	});

	passport.deserializeUser(function(id,done){
		User.findOne({
			_id: id
		}, '-password -salt', function(err,user){
			done(err,user);
		});
	});

	//I'm just going to config this for local only
	require('./strategies/local.js')();
};