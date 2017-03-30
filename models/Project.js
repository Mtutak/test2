//Need to add further validation
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const ProjectSchema = new Schema({
  //mongo will automatically create a unique id for each project _id
  //identify creator of project
  creator: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  title: {
  	type: String,
  	required: true
  },
  summary: {
  	type: String,
  	required: true
  },
  detail: {
  	type: String,
  	required: true
  },
  location: {
  	type: String,
  	required: true
  },
  latitude: {
  	type: Number
  },
  longitude: {
  	type: Number
  },
  //all those you've connected with to work on this project  
  tribe: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, 
    {
        timestamps: true
    });

module.exports = mongoose.model('Project', ProjectSchema);