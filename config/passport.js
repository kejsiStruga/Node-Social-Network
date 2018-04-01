// define the strategy 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

// Load user model
const User = mongoose.model('users');
// const user = require('../models/user');
module.exports = function(passport) {
	passport.use(
		new GoogleStrategy({
			clientID: keys.googleClientID, 
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		}, (accessToken, refreshToken, profile, done) => {
			// console.log(accessToken);
			// console.log(profile); // photos[0].value
			// Creating the Image
			const imageURL = profile.photos[0].value.indexOf('?');
			const image = profile.photos[0].value.substring(0,imageURL);
			// The user object we will save in database
			const newUser = {
				googleID: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				image: image
			};
			// First we want to check whether the user with a given ID exists
			User.findOne({
				googleID: profile.id
			}).then(user => {
				if(user) {
					// Returning the user in case of its existence
					// We call done because this is the end result of the Strategy 
					done(null, user);
				} else {
					// Pass the created user
					new User(newUser)
						.save()
						.then(user => done(null, user));
				}
			});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then(user => done(null, user));
	});
}


