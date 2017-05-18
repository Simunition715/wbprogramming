app.factory('DashboardFactory', function($http){
	var factory = {};
	factory.current_user = {};


	factory.session = function(callback){
		$http.get('session').then(function(res){
			if(!res.data.errors){
				factory.current_user = res.data;
				callback(res);
			}else {
				factory.current_user = {};
				callback(false);
			}
		})
	}


	factory.create = function(newUser, callback){
		$http.post("/users",newUser).then(function(res){
			if(!res.data.errors){
				factory.current_user = res.data;
			}
			callback(res);
		})
	}	
	factory.login = function(loginUser, callback){
		$http.post("/session", loginUser).then(function(res){
			if(!res.data.errors){
				factory.current_user = res.data;
			}
			callback(res);
		})
	}
	factory.new = function(newPost, callback){
		$http.post("/create",newPost).then(function(res){

		})
	}
	factory.getPosts = function(callback){
		$http.get('/posts').then(callback);
	}

	return factory;
})