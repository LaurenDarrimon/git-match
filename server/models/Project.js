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
<<<<<<< HEAD
        type: Schema.Types.ObjectId, ref: 'Language'
    }],
    project_owner: {
      type: String,
      required: true,
      trim: true
    }  
=======
        type: Schema.types.ObjectId, ref: 'Language'
    }]
>>>>>>> 0909bdc39e920edef1154223cb8c24f439c9909c

});



const Project = model('Project', projectSchema);

module.exports = Project;

