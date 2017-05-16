var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = mongoose.model('User');
var Post = mongoose.model('Post');



module.exports = {
	index: function(req,res){
		User.find({}).exec(function(err,doc){
			if(err){
				return res.json(err)
			}
			return res.json(doc);
		})
	},
	indexOfPosts: function(req, res){
		Topics.findById(req.params.id).populate('posts').exec(function(err,doc){
			if(err){
				return res.json(err)
			}
			return res.json(doc);
		})
	},
	create: function(req, res){
		if(req.body.password != req.body.password_confirmation){
			return res.json({
				"errors":{
					"password":{
						"message":"Passwords do not match!"
					}
				}
			})
		}
		var user = new User(req.body);
		user.save(function(err, user){
			if(err){
				return res.json(err);
			}
			req.session.user = user;
			return res.json(user);
		})
	},
	new: function(req, res){
		var post = new Post(req.body);
		post.save(function(err,post){
			if(err){
				console.log(err);
				return res.json(err);
			}
			console.log(post);
			return res.json(post);
		})
	},
	login: function(req,res){
		var isValid = true;
		User.findOne({email:req.body.email}).exec(function(err,doc){
			if(err){
				return res.json(err);
			}
			if(!doc){
				isValid = false;
			} else {
				if(bcrypt.compareSync(req.body.password,doc.password)){
					var user = {
						name:doc.name,
						email:doc.email,
						_id:doc.id
					}
					req.session.user = user
					return res.json(user);
				} else {
					isValid = false;
				}
			}
			if(!isValid){
				return res.json({
					"errors": "invalid credentials"
				})
			}
		})
	},
	session: function(req, res){
		if(!req.session.user){
			return res.json({
				"errors": "not authorized"
			})
		}
		return res.json(req.session.user);
	},
	index: function(req, res){
		Post.find({}).exec(function(err,posts){
			if(err){
				return res.json(err);
			}
			console.log(posts);
			return res.json(posts);
		})
	}

}