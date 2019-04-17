const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const util = require('@lib/util');

const userController = {};
//사용자 생성
userController.create = async (req, res, next) => {
  let { username, password, name, email } = req.body;

  try {
    let user = await User.findOne({ username: username });
    if (user) {
      res.send(util.Error('중복 유저입니다.'));
      return;
    }
    user = new User({
      username: username,
      password: password,
      name: name,
      email: email,
    });
    let newUser = await user.save();
    res.set('Location', 'http://localhost:3000/api/user/' + newUser._id);
    res
      .status(200)
      .send({ errorMsg: null, message: '저장되었습니다', user: newUser });
  } catch (error) {
    res.status(500).send(util.Error(error));
  }
};
userController.list = (req, res, next) => {
  res.send('user list');
};
userController.get = (req, res, next) => {};
userController.delete = (req, res, next) => {};
userController.update = (req, res, next) => {};

module.exports = userController;
