const express = require('express');
const controller = require('../controllers/particpanteController');

const router = express.Router();


router.post('/create', controller.createEventoParticipante);
router.get('/', controller.getAllPArticipantes);

module.exports = router;