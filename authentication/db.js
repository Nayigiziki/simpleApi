var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: String,
  password: String,
  occupation: String,
  city: String
});
module.exports = {
  userModel : mongoose.model('User', userSchema)
};