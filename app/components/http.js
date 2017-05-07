(function(angular){
	// console.log($window)
	angular.module('moviecat.services.http',[])
	.service('HttpService',['$document','$window',function($document,$window){
		// console.log(this);
	this.jsonp = function(url,data,callback){
		// 1.挂载回调函数
		var fnSuffix = Math.random().toString().replace('.','');
		var cbFuncName = 'my_json_cb_'+fnSuffix;
		$window[cbFuncName] = callback;
		// window.my_json_cb_02132817213 = callback;
		// 2. 将data转换成url字符串的格式
		var querystring = url.indexOf('?')==-1?'?':'&';
		for(var key in data){
			querystring += key +'='+ data[key]+'&';
		}

			querystring += 'callback='+ cbFuncName;

			// 4. 创建一个script标签
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url+querystring;

			// 5. 将script标签放到页面中
			$document[0].body.appendChild(scriptElement);

	}

	}])
})(angular)
