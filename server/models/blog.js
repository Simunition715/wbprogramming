var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	post: {
		type: String,
		required: true
	}
}, {timestamps: true})


mongoose.model('Post',PostSchema);