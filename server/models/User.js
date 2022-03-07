const { Schema, model } = require('mongoose');

const emailValidate = function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    githubUser: {
        type: String, 
        required: true,
        trim: true,
    },
    email: {
        type: String, 
        required: true,
        trim: true,
        validate: [emailValidate, 'invalid Email']
    },
    swipeRight: {
        type: String,
        
    }
});

const User = model('User', userSchema);

module.exports = User;