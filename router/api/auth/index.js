const router = require('express').Router();
const auth = require('./auth-controller');

router.post('/login', auth.login);

module.exports = router;
