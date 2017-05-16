var Dashboard = require('../controllers/dashboard');
// var Topics = require('../controllers/topics');
// var Categories = require('../controllers/categories');
// var Posts = require('../controllers/posts');

module.exports = function(app){
	app.post('/users',Dashboard.create);	
	app.post('/session',Dashboard.login);
	app.post('/create',Dashboard.new);
	app.get('/posts',Dashboard.index);
}