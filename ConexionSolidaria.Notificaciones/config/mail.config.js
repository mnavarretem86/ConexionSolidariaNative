require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER || 'localhost',
    port: parseInt(process.env.SMTP_PORT || '2525'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'admin@conexionsolidaria.org',
        pass: process.env.SMTP_PASS || 'Temporal*123'
    },
    tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
    }
});

const verificarConexionSMTP = () => {
    console.log("Verificando conexión con el servidor de correos...");
    transporter.verify((error) => {
        if (error) {
            console.log("Error crítico de configuración SMTP en Node.js:", error.message);
        } else {
            console.log("El microservicio se ha autenticado con éxito en mail.conexionsolidaria.org");
        }
    });
};

module.exports = { transporter, verificarConexionSMTP };