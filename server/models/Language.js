const { Schema, model } = require('mongoose');

const languageSchema = new Schema({
    language:{
        type: String
    },
    count: {
        type: Number
    }
});

module.exports = languageSchema;
