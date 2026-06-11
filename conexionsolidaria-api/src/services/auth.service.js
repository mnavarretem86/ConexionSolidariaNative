const { sql, pool } = require('../../config/db');

const login = async (email) => {
  try {
    const connection = await pool;

    const result = await connection.request()
      .input('EMAIL', sql.NVarChar(150), email)
      .execute('USP_LOGIN');

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { login };