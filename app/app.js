(function(angular){
	'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_list'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]).controller('MovieController',['$scope','$routeParams','$location',function($scope,$routeParams,$location){
	$scope.$location = $location;
	$scope.type='';
	$scope.$watch('$location.path()',function(now){
		if(now.startsWith('in_theaters')){
			$scope.type = 'in_theaters';
		}else if(now.startsWith('top250')){
			$scope.type = 'top250';
		}else if(now.startsWith('coming_soon')){
			$scope.type = 'coming_soon';
		}
	})
}]);

})(angular)
