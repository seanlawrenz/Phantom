'use strict';

//Setting up the angular for RESTful Api use with posts
angular.module('posts').config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/posts',{
		templateUrl: 'posts/views/list-posts.client.view.html'
	}),
	when('/posts/create',{
		templateUrl: 'posts/views/create-posts.client.view.html'
	}),
	when('/posts/:postId',{
		templateUrl: 'posts/views/view-posts.clent.view.html'
	});
	when('/posts/:postId/edit',{
		templateUrl: 'posts/views/edit-posts.client.view.html'
	});
}]);