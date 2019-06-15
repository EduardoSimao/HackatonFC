const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router.get('/', controller.getUser);
router.post('/create', controller.createUser);
router.post('/auth', controller.postAuth);

module.exports = router;