const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

const userController = {};
userController.create = (req, res, next) => {
  res.send('user create');
};
userController.list = (req, res, next) => {
  res.send('user list');
};
userController.get = (req, res, next) => {};
userController.delete = (req, res, next) => {};
userController.update = (req, res, next) => {};

module.exports = userController;
