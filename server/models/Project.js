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
        type: Schema.Types.ObjectId, ref: 'Language'
    }],
    project_owner: {
      type: String,
      required: true,
      trim: true
    }  
});



const Project = model('Project', projectSchema);

module.exports = Project;

