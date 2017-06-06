'use strict';

angular.module('users').factory('Authentiction', [function(){
	// Use the rendered user object since it is show by node
	this.user = window.user;
	return {user: this.user};
}]);