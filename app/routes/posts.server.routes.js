'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
	posts = require('../../app/controllers/post.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'posts' base routes 
	app.route('/api/posts')
	   .get(posts.list)
	   .post(users.requiresLogin, posts.create);
	
	// Set up the 'posts' parameterized routes
	app.route('/api/posts/:postId')
	   .get(posts.read)
	   .put(users.requiresLogin, posts.hasAuthorization, posts.update)
	   .delete(users.requiresLogin, posts.hasAuthorization, posts.delete);

	// Set up the 'postId' parameter middleware   
	app.param('postId', posts.postByID);
};