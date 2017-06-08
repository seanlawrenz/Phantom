'use strict';

angular.module('posts').controller('PostsController', ['$scope','$routeParams','$location','Authentication', 'Posts',
	function($scope, $routeParams, $location, Authentication, Posts){
		$scope.authentication = Authentication;

		//title and content form fields
		$scope.create = function(){
			var post = new Posts({
				title: this.title,
				content: this.content
			});

			post.$save(function(response){
				$location.path('posts/' + response._id);
			},
			function(errorResponse){
				$scope.error = errorResponse.data.message;
			});
		};

		//Find method
		$scope.find = function(){
			$scope.posts = Posts.query();
		};

		//Find one method
		$scope.findOne = function(){
			$scope.post = Posts.get({
				postId: $routeParams.postId
			});
		};

		//Edit method
		$scope.update = function(){
			$scope.post.$update(function(){
				$location.path('posts/' + $scope.post._id);
			}, function(errorResponse){
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(post){
			if(post){
				post.$remove(function(){
					for (var i in $scope.post){
						if($scope.post[i] === post){
							$scope.post.splice(i,1);
						}
					}
				});
			}else{
				$scope.post.$remove(function(){
					$location.path('posts');
				});
			}
		};
}]);