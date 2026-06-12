const { sql, pool } = require('../../config/db');
const bcrypt = require('bcrypt');
const emailService = require('./email.service');

const solicitarCodigo = async (model) => {
  try {
    const connection = await pool;

    if (!model) {
      throw new Error('No se enviaron datos');
    }

    if (!model.email || !model.dni) {
      throw new Error('Email y DNI son obligatorios');
    }

    const email = model.email.toLowerCase().trim();
    const dni = model.dni.toString().replace(/-/g, '').toUpperCase();

    const check = await connection.request()
      .input('Email', sql.NVarChar(150), email)
      .input('DNI', sql.NVarChar(50), dni)
      .query(`
        SELECT COUNT(1) as existe 
        FROM Persona 
        WHERE Email = @Email OR DNI = @DNI
      `);

    if (check.recordset[0].existe > 0) {
      throw new Error('El correo o DNI ya están registrados');
    }

    const passwordTemporal = "UdeM" + dni.slice(-6);
    const passwordHash = await bcrypt.hash(passwordTemporal, 10);

    const tokenOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const payload = {
      primerNombre: model.primerNombre,
      segundoNombre: model.segundoNombre,
      primerApellido: model.primerApellido,
      segundoApellido: model.segundoApellido,
      dni: dni,
      genero: model.genero,
      fechaNacimiento: model.fechaNacimiento,
      email: email,
      telefono: model.telefono,
      direccion: model.direccion,
      passwordHash: passwordHash
    };

    const jsonPayload = JSON.stringify(payload);

    await connection.request()
      .input('Email', sql.NVarChar(150), email)
      .query(`
        UPDATE TokenRegistroTemporal 
        SET Validado = 1 
        WHERE Email = @Email AND Validado = 0
      `);

    await connection.request()
      .input('Email', sql.NVarChar(150), email)
      .input('Token', sql.NVarChar(10), tokenOtp)
      .input('Payload', sql.NVarChar(sql.MAX), jsonPayload)
      .query(`
        INSERT INTO TokenRegistroTemporal 
        (Email, Token, FechaExpiracion, DatosJsonPayload)
        VALUES (@Email, @Token, DATEADD(minute,15,GETDATE()), @Payload)
      `);

    await emailService.enviarCodigo(
      email,
      model.primerNombre,
      tokenOtp
    );

    return {
      success: true,
      message: 'Código de verificación enviado'
    };

  } catch (error) {
    throw error;
  }
};


const verificarCodigo = async (email, token) => {
  try {
    const connection = await pool;

    if (!email || !token) {
      throw new Error('Email y token son requeridos');
    }

    // validar OTP (SP)
    const result = await connection.request()
      .input('Email', sql.NVarChar(150), email)
      .input('Token', sql.NVarChar(10), token)
      .execute('USP_VALIDAR_REGISTRO_OTP');

    const data = result.recordset[0];

    if (!data || data.Status !== 'Success') {
      throw new Error(data?.Mensaje || 'OTP inválido');
    }

    const payload = JSON.parse(data.JsonPayload);

    // ejecutar registro (SP)
    const registro = await connection.request()
      .input('PrimerNombre', sql.NVarChar(100), payload.primerNombre)
      .input('SegundoNombre', sql.NVarChar(100), payload.segundoNombre)
      .input('PrimerApellido', sql.NVarChar(100), payload.primerApellido)
      .input('SegundoApellido', sql.NVarChar(100), payload.segundoApellido)
      .input('DNI', sql.NVarChar(50), payload.dni)
      .input('Genero', sql.NVarChar(20), payload.genero)
      .input('FechaNacimiento', sql.Date, payload.fechaNacimiento)
      .input('Email', sql.NVarChar(150), payload.email)
      .input('Telefono', sql.NVarChar(50), payload.telefono)
      .input('Direccion', sql.NVarChar(200), payload.direccion)
      .input('PasswordHash', sql.NVarChar(255), payload.passwordHash)
      .execute('USP_REGISTRO');

    const regData = registro.recordset[0];

    if (!regData || regData.Status !== 'Success') {
      throw new Error(regData?.Mensaje || 'Error en registro');
    }

    // enviar correo final
    const passwordTemporal = "UdeM" + payload.dni.slice(-6);

    await emailService.enviarRegistro(
      payload.email,
      payload.primerNombre,
      payload.dni,
      passwordTemporal
    );

    return {
      success: true,
      message: 'Registro completado con éxito'
    };

  } catch (error) {
    throw error;
  }
};

module.exports = {
  solicitarCodigo,
  verificarCodigo
};