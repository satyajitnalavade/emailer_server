const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId:  String
});
userSchema.plugin(findOrCreate);

mongoose.model('users', userSchema);