app.controller('DashboardController', function(DashboardFactory, $location, $routeParams){
	console.log('instanciating Dashboard controller...');
	var self = this;
	self.newUser = {};
	self.registrationErrors = [];
	self.loginErrors = [];
	self.current_user = {};
	self.loginUser = {};
	self.posts = [];	

	DashboardFactory.session(function(res){
		if(res){
			self.current_user = res.data;
		}else {
			self.current_user = {};
			$location.url('/');
		}
	})

	self.create = function(newUser){
		self.registrationErrors = [];
		DashboardFactory.create(newUser, function(res){
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key]
					self.registrationErrors.push(error.message);
				}
			}else{
				self.newUser = {};
				$location.url('/blog')
			}	
		})
	}
	self.index = function(req){
		DashboardFactory.getPosts(function(res){
			self.posts = res.data;
		})
	}
	self.login = function(loginUser){
		DashboardFactory.login(loginUser, function(res){
		self.loginErrors = [];
			if(res.data.errors){
				console.log(res);
				self.loginUser = {email:"", password:""};
				self.loginErrors.push(res.data.errors);
				self.session = false;

			}else{
				self.current_user = res.data;
				console.log(res.data)
				console.log(this.current_user)
				$location.url('/blog')

			}
		})
	}
	self.logout = function(current_user){
		self.current_user = {};
		$location.url('/')
	}
	self.createPost = function(newPost){
		DashboardFactory.new(newPost, function(res){
			if(res.data.errors){
				var perror = res.data.errors
			}else {
				self.current_user = {};
				self.newPost = {};
				$location.url('/')
			}
		})
	}

})