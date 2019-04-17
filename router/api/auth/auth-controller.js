const util = require('@lib/util');
const User = require('@models/user');
const config = require('@config/config');
const jwt = require('jsonwebtoken');
const auth = {};
auth.login = async (req, res, next) => {
  let { username, password } = req.body;
  console.log('username , password : ', username, ' ', password);
  try {
    //사용자 / 패스워드를 받았는지 체크
    if (!username) {
      return res.status(500).send(util.Error('username 이 필요합니다.'));
    }
    if (!password) {
      return res.status(500).send(util.Error('password가  필요합니다.'));
    }

    //사용자의 존재여부
    let user = await User.findOne({ username: username }).exec();
    if (!user) {
      return res
        .status(500)
        .send(util.Error('user is not found by ' + username));
    }
    //사용자 패스워드 체크
    if (!user.verify(password)) {
      return res.status(500).send(util.Error('user verify fail ' + username));
    }
    const payload = {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
    };
    const secretKey = config.secretKey;
    const options = { expiresIn: 60 * 60 * 8 };
    jwt.sign(payload, secretKey, options, (err, token) => {
      console.log('token :', token);
      if (err) {
        res.status(500).send(util.Error(err));
      }
      res.send({ errorMsg: null, token: token });
    });
    //
  } catch (error) {
    return res.status(500).json(util.Error(error));
  }
};
auth.loginCheck = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) return res.json(util.Error('로그인 해 주십시오'));
  let secretKey = config.secretKey;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.json(util.Error(err));
    else {
      req.decoded = decoded;
      next();
    }
  });
};

module.exports = auth;
