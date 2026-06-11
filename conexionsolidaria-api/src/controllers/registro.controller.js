// registro.controller.js
const registroService = require('../services/registro.service');

const registro = async (req, res) => {
  try {
    const { token, ...data } = req.body;

    console.log('BODY:', req.body); // 👈 debug

    let response;

    // 🔹 Paso 1: solicitar código
    if (!token) {
      response = await registroService.solicitarCodigo(data);
    } 
    // 🔹 Paso 2: verificar código
    else {
      if (!data.email) {
        return res.status(400).json({
          success: false,
          message: 'El email es requerido para verificar el código'
        });
      }

      response = await registroService.verificarCodigo(data.email, token);
    }

    res.json(response);

  } catch (error) {
    console.error('ERROR CONTROLLER:', error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { registro };