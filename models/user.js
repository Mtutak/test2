const mongoose = require('mongoose');


const bcrypt = require('bcrypt-nodejs');
// var encrypt = require('mongoose-encryption');
var Schema = mongoose.Schema;
// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String,
  title: { 
  	type: String,
  },
  bio: { 
  	type: String,
  },
  detail: { 
  	type: String
  },
  location: { 
  	type: String,
  },
   profileimg: {
    type: String
  },
  connections: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Note model
    ref: "User"
  }],
  pendingConnections: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Note model
    ref: "User"
  }]
},
  {
        timestamps: true
    });


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


    return bcrypt.hash(user.password, null, null, function(hashError, hash){
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });

});


module.exports = mongoose.model('User', UserSchema);