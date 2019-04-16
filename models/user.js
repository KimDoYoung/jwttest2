//model / users.js
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  email: String,
});

//저장전에 password를 hash처리
userSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) {
    next();
  } else {
    user.password = bcrypt.hashSync(user.password);
    next();
  }
});
//암호가 맞는지 체크
userSchema.methods.verify = function(password) {
  const user = this;
  try {
    return bcrypt.compareSync(user.password, password);
  } catch (error) {
    console.error(error);
    return false;
  }
};
module.exports = mongoose.model('User', userSchema);
