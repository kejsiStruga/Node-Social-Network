/*  Create the routes file for papers, all the href links will be directed in routes defined here
    So we may say, that for every 'Topic' we have in our app we must also have 
    a route file where we define the apis;
    So in other words, for this app we will have a route file for: 
        - app.js / index.js and auth.js; which serves as the entry point of the application
          and also provides authentication service
        - papers which is an entity in our application
    
    So for every service that we offer we have 1/+1 routes files
    + Each entity should have its route file where we define the CRUD operations

    Also in each route file we should have the express and express.Router()
*/
/* Express --> 
    routing : refers to how an application's endpoint (URIs) respond to client requests;
    Routing is defined using methods of the Express *** app object *** that correspond to HTTP methods;
    app.get() app.post() etc 
    app.use() specifies the middleware as the callback function; 
    The routing methods specify a callback function (aka "handler function") called when the application receives
    a request to the specified riute (endpoint) abd HTTP method; In other words, the application "listens" for 
    requests that match the specified route(s) and method(s), and when it detects such a match, it calls the soecified callback function;

    Route paths can be constructed in different ways, for instance: using string patterns and route parameters

    Each router file must be added in the app.js file since it server as the entry point of the app
    Also we must .use it in the end of the file, as a middleware!
*/
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const mongoose = require('mongoose');
const Paper = mongoose.model('papers');
const User = mongoose.model('users');
const stripTags = require('strip-tags');

// Papers index
router.get('/', (req, res) => {
    Paper.find({status: 'public'})
        .populate('user') // populate the author with all data from users schema
        .sort({date: 'desc'})
        .then(papers => {
            res.render('papers/index', {
               papers: papers
            });
        });
    // res.render('papers/index');
});

// Add Papers form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('papers/add');
});

// Papers dashboard
router.get('/dashboard', (req, res) => {
    res.render('papers/dashboard'); // res.render(<FilePath>)
});

router.post('/', (req, res) => {
    
    let allowComments; 

    if(req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newPaper = {
        title: req.body.title,
        body: stripTags(req.body.body),
        status: req.body.status,
        allowComments: allowComments, 
        user: req.user.id
    }
    
    new Paper(newPaper)
        .save()
        .then(paper => {
            res.redirect(`/papers/show/${paper.id}`);
        });
});

// Edit paper form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Paper.findOne({
        _id: req.params.id
    })
    .then(paper => {
        if(paper.user != req.user.id) {
            res.redirect('/papers');
        } else {
            res.render('papers/edit',{
                paper: paper
            });
        }
    });
});

// Edit Form Process
router.put('/:id', (req, res) => {
    // res.send('put');
    Paper.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(paper => {
        let allowComments;
        res.render('papers/show',{
            paper: paper
        });
        if(req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }
        // New vals
        paper.title = req.body.title;
        paper.body = req.body.body;
        paper.status = req.body.status;
        paper.allowComments = allowComments;

        paper.save()
            .then(paper => {
                res.redirect('/dashboard');
            });
    });
});

// Show paper; column :id is the placeholder
router.get('/show/:id', (req,res) => {
    Paper.findOne({
        _id: req.params.id
    })
    .populate('user')
    .populate('comments.commentUser')
    .then(paper => {
        if(paper.status == 'public') {
            res.render('papers/show',{
                paper: paper
            });
        } else {
            // we can see private papers only if they are our papers, even if the user copy-pastes the url!!
            // res.redirect('/papers');
            if(req.user) {
                if(req.user.id == paper.user.id) {
                    res.render('papers/show',{
                        paper: paper
                    });
                }
            } else {
                res.redirect('/papers');
            }
        }
    });
});

// Delete paper
router.delete('/:id', (req,res) => {
    // res.send('delete');
    Paper.remove({_id: req.params.id})
        .then(() => {
            res.redirect('/dashboard');
        });
});

// Add A comment
router.post('/comment/:id', (req, res) => {
    Paper.findOne({
        _id: req.params.id
    })
    .then(paper => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }
        
        // insert at the begging of the array!
        paper.comments.unshift(newComment);

        paper.save()
            .then(paper => {
                res.redirect(`/papers/show/${paper.id}`);
            })
    });
});

// List stories from a user
router.get('/user/:userId', (req, res) => {
    console.log('req: ', req);
    console.log('USer: ', req.params.user);

    Paper.find({user: req.params.userId, status: 'public'})
        .populate('user')
        .then(papers => {
            res.render('papers/index', {
                papers:papers
            })
        })
});

// My Papers
router.get('/my', ensureAuthenticated, (req, res) => {
    Paper.find({user: req.user.id})
        .populate('user')
        .then(papers => {
            res.render('papers/index', {
                papers: papers
            })
        })
})

module.exports = router; 


