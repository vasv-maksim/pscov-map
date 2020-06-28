const { Router } = require('express');
const controller = require('../controllers/auth');

const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

module.exports = router;