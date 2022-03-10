const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String
    },
    repo_link: {
        type: String
    },
    deployed_Link: {
        type: String
    },
    languages: [{
        type: Schema.types.ObjectId, ref: 'Language'
    }]

});



const Project = model('Project', projectSchema);

module.exports = Project;

