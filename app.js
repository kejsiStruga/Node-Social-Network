const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Load user model; this line ShOULD be placed ahead of Passport load
require('./models/users');

// Passport Config
require('./config/passport')(passport);

// Load Keys
const keys = require('./config/keys');

// Load Routes
const auth = require('./routes/auth')

// Global Promise map
mongoose.Promise = global.Promise;

// Mongoose Connection Congif
mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB Connected'))
	.catch(error => console.log('error: ',error));


app.get('/', (req, res) => {
	res.send('Working Node')
});

app.use(cookieParser());

app.use(expressSession({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes; Should be below the usage of cookieParse, expressSession and passport middleware initilization
app.use('/auth', auth);

// Setting global variables; So that user dont have to login every time we restart the server only when they logout
app.use((req, res, next) => {
	req.locals.user = req.user || null;
	next();
})

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
});




// Google authentication + logout




















