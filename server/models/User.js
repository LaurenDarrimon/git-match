const { Schema, model } = require('mongoose');
const Project = require('./Project');
const bcrypt = require('bcrypt');

// const emailValidate = function validateEmail(email) {
//     const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
//     return re.test(String(email).toLowerCase());
// };


const userSchema = new Schema({
    githubUser: {
        type: String, 
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    
    // email: {
    //     type: String, 
    //     required: true,
    //     trim: true,
    //     validate: [emailValidate, 'invalid Email']
    // },
    name: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String
    },
    blog: {
        type: String
    },
    location: {
        type: String
    },
    member_since: {
        type: String 
    },
    bio: {
        type: String
    },

    swipeRight: [
        { 
            type: Schema.Types.ObjectId, ref: 'User' 
        }
    ],
    mutuals: [
        { 
            type: Schema.Types.ObjectId, ref: 'User' 
        }
    ],
    projects: [
        {
            type: Schema.Types.ObjectId, ref: 'Project'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;