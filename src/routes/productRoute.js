const router2 = require('express').Router();
const ctrl2 = require('../controllers/productController');
const verifyToken2 = require('../middleware/verifyToken');

router2.get('/', ctrl2.list);
router2.get('/:id', ctrl2.getById);
router2.post('/', verifyToken2, ctrl2.create);
router2.patch('/:id', verifyToken2, ctrl2.update);
router2.delete('/:id', verifyToken2, ctrl2.remove);

module.exports = router2;
