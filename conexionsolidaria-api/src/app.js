const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger'); 

const authRoutes = require('./routes/auth.routes');
const registroRoutes = require('./routes/registro.routes'); 
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Endpoints de la API
app.use('/api/auth', authRoutes);
app.use('/api/registro', registroRoutes); 
app.use('/api/dashboard', dashboardRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;