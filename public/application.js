'use strict';

var mainApplicationModuleName = 'phantom';

var mainApplicationModule =  angular.module(mainApplicationModuleName,['ngResource','ngRoute','index','users','posts']);

//Hashbangs for SEO. This is so Google crawlers can see the angular app
mainApplicationModule.config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Bootstrapping to index
angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);
});