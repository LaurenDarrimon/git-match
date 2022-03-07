const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String
    },
    repo_link: {
        type: String
    },
    languages: [languageSchema],
    deployed_Link: {
        type: String
    }
});

const languageSchema = new Schema({
    language:{
        type: String
    },
    count: {
        type: Number
    }
});

const Project = model('Project', projectSchema);

module.exports = Project;

