'use strict';

//Loading user controller
var users = require('../../app/controllers/users.server.controller'),
 passport = require('passport');

//signin and signout for users
module.exports = function(app){
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local',{
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));

	app.get('/signout', users.signout);
};