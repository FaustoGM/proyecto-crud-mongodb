const router3 = require('express').Router();
const ctrl3 = require('../controllers/userController');

router3.post('/register', ctrl3.register);
router3.post('/login', ctrl3.login);

module.exports = router3;
