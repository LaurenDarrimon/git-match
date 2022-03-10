const { Schema, model } = require("mongoose");
const Language = require("./Language");

const projectSchema = new Schema({
  githubUser: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
  },
  description: { type: String },
  repo_link: {
    type: String,
  },
  deployed_link: {
    type: String,
  },
  languages: [Language],
  //     {
  //     type: Schema.types.ObjectId, ref: 'Language'
  // }
});

const Project = model("Project", projectSchema);

module.exports = Project;
