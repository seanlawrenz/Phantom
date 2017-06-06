'use strict';

//Loading Schema
var User = require('mongoose').model('User'),
passport = require('passport');

//Error handeling function. To be used for every request
var getErrorMessage = function(err) {
	var message = '';
	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			// General error
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

exports.renderSignin = function(req,res,next){
	if(!req.user){
		res.render('signin', {
			title: 'Sign-in Form',
			// flash is middlewear that passes the message variable 
			message: req.flash('error') || req.flash('info')
		});
	}else{
		return res.redirect('/');
	}
};

exports.renderSignup = function(req,res,next){
	if(!req.user){
		res.render('signup', {
			title: 'Sign-up form',
			message: req.flash('error')
		});
	}else{
		return res.redirect('/');
	}
};

// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
	// If new user, create and login a new user, otherwise redirect the user back to the main application page
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		// Set the user provider property in this case local
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/signup');
			}
			// If the user was created successfully use the Passport 'login' method to login
			req.login(user, function(err) {
				// If a login error occurs move to the next middleware
				if (err) return next(err);
				return res.redirect('/');
			});
		});
	} else {
		return res.redirect('/');
	}
};

//Social Media or Oauth save
exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user) {
		if (err) {
			return done(err);
		} else {
			// If a user could not be found, create a new user, otherwise, continue to the next middleware
			if (!user) {
				// Set a possible base username I'm using their email to suggest the username
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
				// Find a unique available username
				User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
					// Set the available user name 
					profile.username = availableUsername;
					// Create the user
					user = new User(profile);
					// Try saving the new user document
					user.save(function(err) {
						if(err){
							var message = _this.getErrorMessage(err);
							req.flash('error', message);
							return res.redirect('/signup');
						}
						// Continue to the next middleware
						return done(err, user);
					});
				});
			} else {
				return done(err, user);
			}
		}
	});
};

exports.signout = function(req,res){
	req.logout();
	res.redirect('/');
};

//Authentication for users to CRUD
exports.requiresLogin = function(req,res,next){
	if(!req.isAuthenticated()){
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};
