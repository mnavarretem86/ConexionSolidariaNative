const authService = require('../services/auth.service');
const bcrypt = require('bcryptjs');

/**
 * Inicia sesión de usuario y establece la sesión
 */
const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    
    // Validación de entrada básica
    if (!email || !contrasena) {
      return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
    }

    const user = await authService.login(email);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(contrasena, user.Contrasena);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Guardar datos en la sesión
    req.session.usuarioID = user.UsuarioID;
    req.session.nombre = `${user.PrimerNombre} ${user.PrimerApellido}`;
    req.session.email = email;
    req.session.voluntarioID = user.VoluntarioID;
    req.session.rol = user.NombreRol;
    // Aseguramos que el valor de la sesión sea un número entero (1 o 0)
    req.session.debeCambiarPassword = user.DebeCambiarPassword ? 1 : 0;

    return res.json({ 
      success: true, 
      cambiarPassword: req.session.debeCambiarPassword === 1,
      nombre: req.session.nombre
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

/**
 * Cambia la contraseña del usuario actual
 */
const cambiarPassword = async (req, res) => {
  try {
    const { nuevaPassword, passwordActual } = req.body;
    const usuarioID = req.session.usuarioID;
    
    // Convertimos a booleano para facilitar la lógica
    const esTemporal = req.session.debeCambiarPassword === 1;

    if (!usuarioID) {
      return res.status(401).json({ success: false, message: 'No autenticado' });
    }

    // Lógica de seguridad:
    // 1. Si NO es contraseña temporal, validamos que la actual sea correcta.
    // 2. Si ES temporal, saltamos la validación de la contraseña actual (el usuario no la conoce).
    if (!esTemporal) {
      if (!passwordActual) {
        return res.status(400).json({ success: false, message: 'Se requiere la contraseña actual' });
      }

      const hashActual = await authService.getPasswordHash(usuarioID);
      const esValida = await bcrypt.compare(passwordActual, hashActual);
      
      if (!esValida) {
        return res.status(401).json({ success: false, message: 'Contraseña actual incorrecta' });
      }
    }

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashNueva = await bcrypt.hash(nuevaPassword, salt);

    // Guardar en Base de Datos
    await authService.updatePassword(usuarioID, hashNueva);

    // Actualizar el estado en la sesión
    req.session.debeCambiarPassword = 0;

    return res.json({ success: true, message: 'Contraseña actualizada correctamente' });

  } catch (error) {
    console.error("Error en cambiarPassword:", error);
    res.status(500).json({ success: false, message: 'Error al actualizar la contraseña' });
  }
};

/**
 * Cierra la sesión del usuario
 */
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'No se pudo cerrar la sesión' });
    }
    // Opcional: Limpiar la cookie en el cliente
    res.clearCookie('connect.sid'); 
    res.json({ success: true, message: 'Sesión cerrada' });
  });
};

module.exports = { login, cambiarPassword, logout };