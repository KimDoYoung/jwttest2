const router = require('express').Router();
const auth = require('./controller');

router.post('/login', auth.login);

module.exports = router;