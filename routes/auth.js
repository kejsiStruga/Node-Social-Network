const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
	scope: ['profile', 'email'] // what to share from user; the scope of what we want to request for the user to authentiacet
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'login' }) ,
	(req,res) => {
		res.redirect('/')
	});

module.exports = router;