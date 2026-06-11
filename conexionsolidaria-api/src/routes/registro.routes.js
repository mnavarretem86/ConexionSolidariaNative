const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registro.controller');

/**
 * @swagger
 * /api/registro:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Registro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               primerNombre:
 *                 type: string
 *               segundoNombre:
 *                 type: string
 *               primerApellido:
 *                 type: string
 *               segundoApellido:
 *                 type: string
 *               dni:
 *                 type: string
 *               genero:
 *                 type: string
 *               fechaNacimiento:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */

// 🔥 CORRECCIÓN AQUÍ: antes era '/registro'
router.post('/', registroController.registro);

module.exports = router;