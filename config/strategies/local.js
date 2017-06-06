'use strict';

 var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
	 	 User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalStrategy(function(username, password, done) {
		// Use the 'User' model 'findOne' method to find a user with the current username
		User.findOne({
			username: username
		}, function(err, user) {
			// General error
			if (err) {
				return done(err);
			}
			// If a user was not found
			if (!user) {
				return done(null, false, {
					message: 'Unknown user'
				});
			}
			// If the passport is incorrect
			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			// Found user
			return done(null, user);
		});
	}));
};
