const router = require('express').Router();
const ctrl = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', verifyToken, ctrl.create);
router.patch('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
