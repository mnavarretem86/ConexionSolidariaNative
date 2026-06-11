const authService = require('../services/auth.service');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    const user = await authService.login(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    const validPassword = await bcrypt.compare(contrasena, user.Contrasena);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    return res.json({
      success: true,
      usuarioID: user.UsuarioID,
      voluntarioID: user.VoluntarioID,
      nombre: `${user.PrimerNombre} ${user.PrimerApellido}`,
      rol: user.NombreRol,
      debeCambiarPassword: user.DebeCambiarPassword
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { login };