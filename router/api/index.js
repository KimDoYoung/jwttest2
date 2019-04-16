const router = require('express').Router();
const auth = require('./auth/index');
const user = require('./user/index');

router.use('/auth', auth);
router.use('/user', user);

module.exports = router;
