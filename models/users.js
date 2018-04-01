const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the user schema
const userSchema = new Schema({
	googleID: {
		type:String,
		required: true // Since we only use Google as authentication provider
	},
	email: {
		type: String,
		required: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	image: {
		type:String
	}
});

// Now we have a user model within mongoose; next, we shall save the authenticated
// user by getting his profile info which we get from google auth callback into the db 
var users = mongoose.model('users', userSchema);
module.exports =  { users } 