const express = require('express');
const controller = require('../controllers/eventoController');

const router = express.Router();


router.post('/create', controller.createEvento);
router.get('/', controller.getAllEventos);
router.put('/:id', controller.putEvento);

module.exports = router;