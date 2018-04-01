const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const passport = require('passport');

// Passport Config
// app.use(passport.initialize());
// app.use(passport.session());

require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth')

app.get('/', (req, res) => {
	res.send('Working Node')
});

app.use('/auth', auth);

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
});