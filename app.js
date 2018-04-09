const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const jquery = require('jquery');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Load user model; this line ShOULD be placed ahead of Passport load
require('./models/users');
require('./models/papers');
// Passport Config
require('./config/passport')(passport);

// Method override - Perform Post and Delete directly from HTML 
app.use(methodOverride('_method'));

// Load Keys
const keys = require('./config/keys');

// Handlebars Helpers, which should be applied to the middleware
const {
	truncate,
	stripTags,
	formatDate,
	select
} = require('./helpers/hbs');

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const papers = require('./routes/papers');

// Global Promise map
mongoose.Promise = global.Promise;

// Mongoose Connection Congif
mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB Connected'))
	.catch(error => console.log('error: ',error));

// Handlebars Middleware
app.engine('handlebars', exphbs({
	helpers: {
		truncate: truncate,
		stripTags: stripTags,
		formatDate: formatDate,
		select
	},
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
//	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/papers', papers);

app.listen(port, () => {
	console.log(`Server started on port ${port}`)
});





















