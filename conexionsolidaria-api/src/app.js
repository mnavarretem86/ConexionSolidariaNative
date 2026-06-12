const express = require('express');
const cors = require('cors');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger'); 

const authRoutes = require('./routes/auth.routes');
const registroRoutes = require('./routes/registro.routes'); 
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

// --- CONFIGURACIÓN DE CORS DINÁMICA ---
// Esto permite cualquier origen que realice la petición, 
// cumpliendo con la seguridad que piden los navegadores para las credenciales.
app.use(cors({
  origin: function (origin, callback) {
    // Si 'origin' es undefined (peticiones directas tipo curl/postman) o cualquier URL, lo permitimos.
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// --- CONFIGURACIÓN DE SESIÓN ---
// Debe ir después de CORS para que las cookies de sesión se manejen correctamente.
app.use(session({
  secret: 'tu_secreto_muy_seguro', // Cambia esto por una variable de entorno en producción
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Pon 'true' si usas HTTPS (recomendado en producción)
    httpOnly: true, // Protege la cookie de accesos mediante JS en el frontend
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// --- RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/registro', registroRoutes); 
app.use('/api/dashboard', dashboardRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- MANEJADOR DE ERRORES GLOBAL (Opcional pero recomendado) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

module.exports = app;