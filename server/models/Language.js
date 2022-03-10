const { Schema, model } = require('mongoose');

const languageSchema = new Schema({
    language:{
        type: String
    },
    count: {
        type: Number
    }
});

// const Language = model('Language', languageSchema);

module.exports = languageSchema;
