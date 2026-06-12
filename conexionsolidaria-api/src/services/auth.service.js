const { sql, pool } = require('../../config/db');

const login = async (email) => {
  const connection = await pool;
  const result = await connection.request()
    .input('EMAIL', sql.NVarChar(150), email)
    .execute('USP_LOGIN');
  return result.recordset[0];
};

// Obtener hash actual para verificar en caso de no ser contraseña temporal
const getPasswordHash = async (usuarioID) => {
  const connection = await pool;
  const result = await connection.request()
    .input('ID', sql.Int, usuarioID)
    .query('SELECT Contrasena FROM Usuario WHERE UsuarioID = @ID');
  return result.recordset[0]?.Contrasena;
};

// Actualizar la contraseña
const updatePassword = async (usuarioID, hashNueva) => {
  const connection = await pool;
  await connection.request()
    .input('ID', sql.Int, usuarioID)
    .input('PASS', sql.NVarChar(255), hashNueva)
    .query('UPDATE Usuario SET Contrasena = @PASS, DebeCambiarPassword = 0 WHERE UsuarioID = @ID');
};

module.exports = { login, getPasswordHash, updatePassword };