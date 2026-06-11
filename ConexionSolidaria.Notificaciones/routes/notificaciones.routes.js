const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/notificaciones.controller');

router.post('/enviar-otp', notificacionesController.enviarCodigoOTP);
router.post('/registro', notificacionesController.enviarRegistroBienvenida);

router.post('/inscripcion', notificacionesController.enviarConfirmacionInscripcion);
router.post('/desinscripcion', notificacionesController.enviarCancelacionInscripcion);

module.exports = router;