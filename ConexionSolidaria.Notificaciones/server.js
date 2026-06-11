require('dotenv').config();
const express = require('express');
const notificacionesRoutes = require('./routes/notificaciones.routes');
const { verificarConexionSMTP } = require('./config/mail.config');

const app = express();
app.use(express.json());

app.use('/api/notificaciones', notificacionesRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`\nServidor de notificaciones ejecutándose en http://localhost:${PORT}`);
    
    verificarConexionSMTP();
});