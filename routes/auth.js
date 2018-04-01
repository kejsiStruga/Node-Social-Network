const express = require('express');
const router = express.Router();
const passport = require('passport');

// All the routes below are accessed with a 'auth' before their path, since we are in the auth file
// and we really make use of them in the app.js file

router.get('/google', passport.authenticate('google', {
	scope: ['profile', 'email'] // what to share from user; the scope of what we want to request for the user to authentiacet
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }) ,
	(req,res) => {
		res.redirect('/dashboard')
	});

router.get('/verify', (req,res) => {
	if(req.user) {
		console.log(req.user);
	} else {
		console.log('Not Authenticated');
	}
});

router.get('/logout', (req,res) => {
	req.logout();
	res.redirect('/');
})

module.exports = router;