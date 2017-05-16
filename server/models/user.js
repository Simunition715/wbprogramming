var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
}, {timestamps: true})

UserSchema.pre('save',function(done){
	this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
	done();
});

mongoose.model('User',UserSchema);