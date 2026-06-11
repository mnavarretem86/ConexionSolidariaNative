const axios = require('axios');

const NOTIFICATIONS_API = process.env.NOTIFICATIONS_API_URL 
  || 'http://localhost:5001/api/notificaciones';

const emailService = {

  enviarCodigo: async (emailDestino, nombre, tokenOtp) => {
    try {
      await axios.post(`${NOTIFICATIONS_API}/enviar-otp`, {
        emailDestino,
        nombre,
        tokenOTP: tokenOtp
      });
    } catch (error) {
      console.error('Error enviando OTP:', error.message);

      throw new Error(
        'Error al despachar el código OTP desde el microservicio.'
      );
    }
  },

  enviarRegistro: async (emailDestino, nombre, dni, passwordTemporal) => {
    try {
      await axios.post(`${NOTIFICATIONS_API}/registro`, {
        emailDestino,
        nombre,
        dni,
        passwordTemporal
      });
    } catch (error) {
      console.error('Error enviando correo de registro:', error.message);

      // ⚠️ aquí NO lanzamos error para no romper el registro
      // (igual que hiciste en C# con try/catch vacío)
    }
  }

};

module.exports = emailService;