const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post('/login', authController.login);

module.exports = router; 