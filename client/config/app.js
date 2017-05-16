var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'DashboardController as DC'
	})
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'DashboardController as DC'
	})
	.when('/blog',{
		templateUrl: 'partials/dashboard.html',
		controller: 'DashboardController as DC'
	})
	.when('/about',{
		templateUrl: 'partials/about.html',
		controller: 'DashboardController as DC'
	})
	.otherwise('/')
})