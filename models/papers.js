const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the paper schema
const paperSchema = new Schema({
	title: {
        type: String, 
        required: true
    },
    body: {
        type: String, 
        required: true
    },
    status: {
        type: String, 
        default: 'public'
    },
    allowComments: {
        type: Boolean, 
        default: true
    },
    comments: [{
        commentBody: {
            type: String, 
            required: true
        },
        commentData: {
            type: Date,
            default: Date.now()
        },
        commentUser: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

// Now we have a user model within mongoose; next, we shall save the authenticated
// user by getting his profile info which we get from google auth callback into the db 
var papers = mongoose.model('papers', paperSchema, 'stories'); // third param to specify the name of sche,a ourself
module.exports =  { papers } 