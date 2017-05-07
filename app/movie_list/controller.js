(function(angular){

'use strict';
// var data = [{
// 		"rating": {
// 			"max": 10,
// 			"average": 8.4,
// 			"stars": "45",
// 			"min": 0
// 		},
// 		"genres": ["\u52a8\u4f5c", "\u79d1\u5e7b", "\u5192\u9669"],
// 		"title": "\u94f6\u6cb3\u62a4\u536b\u961f2",
// 		"casts": [{
// 			"alt": "https:\/\/movie.douban.com\/celebrity\/1017967\/",
// 			"avatars": {
// 				"small": "http://img7.doubanio.com\/img\/celebrity\/small\/1408271589.94.jpg",
// 				"large": "http://img7.doubanio.com\/img\/celebrity\/large\/1408271589.94.jpg",
// 				"medium": "http://img7.doubanio.com\/img\/celebrity\/medium\/1408271589.94.jpg"
// 			},
// 			"name": "\u514b\u91cc\u65af\u00b7\u666e\u62c9\u7279",
// 			"id": "1017967"
// 		}, {
// 			"alt": "https:\/\/movie.douban.com\/celebrity\/1047985\/",
// 			"avatars": {
// 				"small": "http://img7.doubanio.com\/img\/celebrity\/small\/1361267503.33.jpg",
// 				"large": "http://img7.doubanio.com\/img\/celebrity\/large\/1361267503.33.jpg",
// 				"medium": "http://img7.doubanio.com\/img\/celebrity\/medium\/1361267503.33.jpg"
// 			},
// 			"name": "\u4f50\u4f0a\u00b7\u7d22\u5c14\u8fbe\u5a1c",
// 			"id": "1047985"
// 		}, {
// 			"alt": "https:\/\/movie.douban.com\/celebrity\/1014003\/",
// 			"avatars": {
// 				"small": "http://img7.doubanio.com\/img\/celebrity\/small\/1493202154.34.jpg",
// 				"large": "http://img7.doubanio.com\/img\/celebrity\/large\/1493202154.34.jpg",
// 				"medium": "http://img7.doubanio.com\/img\/celebrity\/medium\/1493202154.34.jpg"
// 			},
// 			"name": "\u6234\u592b\u00b7\u5df4\u8482\u65af\u5854",
// 			"id": "1014003"
// 		}],
// 		"collect_count": 28152,
// 		"original_title": "Guardians of the Galaxy Vol. 2",
// 		"subtype": "movie",
// 		"directors": [{
// 			"alt": "https:\/\/movie.douban.com\/celebrity\/1092322\/",
// 			"avatars": {
// 				"small": "http://img7.doubanio.com\/img\/celebrity\/small\/39695.jpg",
// 				"large": "http://img7.doubanio.com\/img\/celebrity\/large\/39695.jpg",
// 				"medium": "http://img7.doubanio.com\/img\/celebrity\/medium\/39695.jpg"
// 			},
// 			"name": "\u8a79\u59c6\u65af\u00b7\u53e4\u6069",
// 			"id": "1092322"
// 		}],
// 		"year": "2017",
// 		"images": {
// 			"small": "http://img7.doubanio.com\/view\/movie_poster_cover\/ipst\/public\/p2455261804.webp",
// 			"large": "http://img7.doubanio.com\/view\/movie_poster_cover\/lpst\/public\/p2455261804.webp",
// 			"medium": "http://img7.doubanio.com\/view\/movie_poster_cover\/spst\/public\/p2455261804.webp"
// 		},
// 		"alt": "https:\/\/movie.douban.com\/subject\/25937854\/",
// 		"id": "25937854"
// 	}];


angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:category/:page', {
    templateUrl: 'movie_list/view.html',
    controller: 'MovieListCtrl'
  });
}])

.controller('MovieListCtrl', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
	// 控制器分为两步：1，暴露数据，2，暴露行为
	var page = parseInt($routeParams.page);
	var count = 4;
	var start = (page-1)*count;
	$scope.loading = true;
	$scope.subjects = [];
	$scope.title = '';
	$scope.message = '';
	$scope.totalCount = 0;
	$scope.totalPages = 0;
	$scope.currentPage = page;
	HttpService.jsonp('https://api.douban.com/v2/movie/' + $routeParams.category,{start:start,count:count},function(data){
		$scope.subjects = data.subjects;
		$scope.totalCount = data.total;
		$scope.title = data.title;

		$scope.totalPages = Math.ceil($scope.totalCount/count);
		$scope.loading = false;
		$scope.$apply();


	})
	// $http.get('../data.json').then(function(res){
 //        if(res.status==200){
 //        	$scope.subjects = res.data.subjects;
 //        }else{
 //        	$scope.message = "获取数据错误"+res.statusText;
 //        }
	// }, function(error){
	// 	console.log(error);
	// 	$scope.message = "获取数据错误"+error.statusText;
	// })


	 $scope.go=function(page){
	 	if(page>=1&&page<=$scope.totalPages){
			$route.updateParams({page:page});
		}
	}

}]);

})(angular)
