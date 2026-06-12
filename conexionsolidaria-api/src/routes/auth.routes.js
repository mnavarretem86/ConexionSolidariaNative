// auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Middleware para verificar la sesión
const isAuthenticated = (req, res, next) => {
  // Aquí es donde el servidor verifica si la cookie de sesión es válida
  if (req.session && req.session.usuarioID) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'No autorizado' });
  }
};

// Asegúrate de que esta ruta tenga el middleware aplicado
router.post('/cambiar-password', isAuthenticated, authController.cambiarPassword);
router.post('/login', authController.login);

module.exports = router;