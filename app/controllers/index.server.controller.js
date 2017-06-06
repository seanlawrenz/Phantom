'use strict';

//Render the user home page
exports.render = function(req,res){

	res.render('index', {
		title: 'Posts',
		user: JSON.stringify(req.user)
	});
};