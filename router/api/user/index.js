// user/index.js
const router = require('express').Router();
const user = require('./user-controller');
const auth = require('../auth/auth-controller');

router.post('/', user.create);
router.get('/', auth.loginCheck, user.list);
router.get('/:id', user.get);
router.delete('/:id', user.delete);
router.put('/:id', user.update);

module.exports = router;
