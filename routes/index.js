const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const mongoose = require('mongoose');
const Paper = mongoose.model('papers');

router.get('/', ensureGuest, (req, res) => {
	res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req,res) => {
	Paper.find({
		user:req.user.id
	}).then(papers => {
		res.render('index/dashboard', {
			papers: papers
		});
	});
});

router.get('/about', (req,res) => {
	res.render('index/about');
});


module.exports = router;