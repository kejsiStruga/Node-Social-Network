const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const jquery = require('jquery');

const app = express();
const port = process.env.PORT || 5000;

// Load user model; this line ShOULD be placed ahead of Passport load
require('./models/users');

// Passport Config
require('./config/passport')(passport);

// Load Keys
const keys = require('./config/keys');

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');

// Global Promise map
mongoose.Promise = global.Promise;

// Mongoose Connection Congif
mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB Connected'))
	.catch(error => console.log('error: ',error));

// Handlebars Middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting global variables; So that user dont have to login every time we restart the server only when they logout
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});

// Use Routes
app.use('/', index);
app.use('/auth', auth);

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
});





















