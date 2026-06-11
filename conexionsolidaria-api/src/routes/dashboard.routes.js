const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

/**
 * @swagger
 * /api/dashboard/eventos:
 *   get:
 *     summary: Obtener lista de eventos
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Lista de eventos obtenida correctamente
 *       500:
 *         description: Error del servidor
 */
router.get('/eventos', dashboardController.getEventos);

/**
 * @swagger
 * /api/dashboard/inscripciones:
 *   get:
 *     summary: Obtener lista de inscripciones
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Lista de inscripciones obtenida correctamente
 *       500:
 *         description: Error del servidor
 */
router.get('/inscripciones', dashboardController.getInscripciones);

module.exports = router;