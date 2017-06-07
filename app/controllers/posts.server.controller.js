'use strict';

var mongoose = require('mongoose'),
		Post = mongoose.model('Post');

//Error handeling function. To be used for every request
var getErrorMessage = function(err){
	if(err.errors){
		for(var errName in err.errors){
			if(err.errors[errName].message) return err.errors[errName].message;
		}
	}else{
		return 'Unknown server error';
	}
};

exports.create = function(req,res){
	var post = new Post(req.body);
	post.creator = req.user;
	post.save(function(err){
		if(err){
			//
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(post);
		}
	});
};

// Use the model 'find' method to get a list of posts
exports.list = function(req, res) {
	Post.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, post) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

// Returns an existing post
exports.read = function(req, res) {
	res.json(req.post);
};

exports.update = function(req, res) {
	// Get the post from the 'request' object
	var post = req.post;

	// Update the post fields
	post.title = req.body.title;
	post.content = req.body.content;

	// Try saving the updated post
	post.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the post
			res.json(post);
		}
	});
};

exports.delete = function(req, res) {
	var post = req.post;
	post.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

// Single existing post
exports.postByID = function(req, res, next, id) {
	Post.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, post) {
		if (err) return next(err);
		if (!post) return next(new Error('Failed to load post ' + id));
		req.post = post;
		next();
	});
};

// Authorization for post change
exports.hasAuthorization = function(req, res, next) {
	if (req.post.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized to change the post'
		});
	}
	next();
};