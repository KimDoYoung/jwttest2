const router = require('express').Router();
const user = require('./controller');

router.post('/', user.create);
router.get('/', user.list);
router.get('/:id', user.get);
router.delete('/:id', user.delete);
router.put('/:id', user.update);

module.exports = router;
