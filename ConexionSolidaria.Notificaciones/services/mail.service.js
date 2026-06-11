const { transporter } = require('../config/mail.config');

const enviarCorreoVerificacionOTP = async (emailDestino, nombre, tokenOTP) => {
    const cuerpoHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #2c3e50; text-align: center;">Verifica tu Correo Electrónico</h2>
        <p style="color: #333333; font-size: 15px;">Hola <strong>${nombre}</strong>,</p>
        <p style="color: #555555; font-size: 14px; line-height: 1.5;">Gracias por querer unirte a <strong>Conexión Solidaria</strong>. Para completar tu solicitud de registro, ingresa el siguiente código de verificación en la plataforma:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <span style="background-color: #f8f9fa; border: 1px dashed #27ae60; color: #27ae60; padding: 10px 30px; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 4px; display: inline-block;">
                ${tokenOTP}
            </span>
            <p style="color: #7f8c8d; font-size: 12px; margin-top: 10px;">Este código expirará en 15 minutos por motivos de seguridad.</p>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
        <p style="font-size: 12px; color: #95a5a6; text-align: center;">Si tú no solicitaste este código, puedes ignorar este mensaje de forma segura.</p>
    </div>`;

    const mailOptions = {
        from: `"${process.env.SMTP_SENDER_NAME || 'Conexión Solidaria'}" <${process.env.SMTP_USER || 'admin@conexionsolidaria.org'}>`,
        to: emailDestino,
        subject: `${tokenOTP} es tu código de verificación de Conexión Solidaria`,
        html: cuerpoHtml
    };

    return await transporter.sendMail(mailOptions);
};

const enviarCorreoRegistro = async (emailDestino, nombre, passwordTemporal, qrDataUrl) => {
    const cuerpoHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #2c3e50; text-align: center;">¡Bienvenido a Conexión Solidaria!</h2>
        <p style="color: #333333; font-size: 15px;">Hola <strong>${nombre}</strong>,</p>
        <p style="color: #555555; font-size: 14px; line-height: 1.5;">Tu cuenta ha sido verificada y activada con éxito mediante nuestro sistema distribuido profesional. A continuación, te compartimos tus credenciales definitivas de acceso:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #27ae60; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 5px 0; font-size: 14px; color: #333333;"><strong>Usuario (Correo):</strong> ${emailDestino}</p>
            <p style="margin: 5px 0; font-size: 14px; color: #333333;"><strong>Contraseña Temporal:</strong> <span style="color: #e74c3c; font-weight: bold;">${passwordTemporal}</span></p>
        </div>

        <div style="text-align: center; margin: 25px 0;">
            <p style="margin-bottom: 10px; font-size: 14px; color: #333333;"><strong>Tu código QR de acceso digital:</strong></p>
            <img src="cid:codigoQR" alt="Código QR de Identificación" style="border: 1px solid #ddd; padding: 5px; border-radius: 4px; width: 150px;"/>
        </div>

        <p style="color: #7f8c8d; font-size: 13px; font-style: italic;">⚠️ Por motivos de seguridad, el sistema te solicitará cambiar esta contraseña la primera vez que inicies sesión.</p>
    </div>`;

    const mailOptions = {
        from: `"${process.env.SMTP_SENDER_NAME || 'Conexión Solidaria'}" <${process.env.SMTP_USER || 'admin@conexionsolidaria.org'}>`,
        to: emailDestino,
        subject: 'Registro Confirmado - Credenciales y Código QR de Acceso',
        html: cuerpoHtml,
        attachments: [{
            filename: 'qr-acceso.png',
            path: qrDataUrl,
            cid: 'codigoQR' 
        }]
    };

    return await transporter.sendMail(mailOptions);
};

// --- NUEVOS MÉTODOS DE EVENTOS ACTUALIZADOS ---

const enviarConfirmacionInscripcion = async (emailDestino, nombre, eventoId, nombreEvento) => {
    const cuerpoHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #2980b9; text-align: center;">¡Inscripción Confirmada!</h2>
        <p style="color: #333333; font-size: 15px;">Hola <strong>${nombre}</strong>,</p>
        <p style="color: #555555; font-size: 14px; line-height: 1.5;">Te confirmamos que te has inscrito exitosamente como voluntario para nuestro próximo evento.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #2980b9; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 5px 0; font-size: 14px; color: #333333;"><strong>Evento:</strong> ${nombreEvento}</p>
            <p style="margin: 5px 0; font-size: 14px; color: #333333;"><strong>ID del Evento:</strong> #${eventoId}</p>
        </div>

        <p style="color: #555555; font-size: 14px; line-height: 1.5;">Gracias por tu compromiso y solidaridad. ¡Nos vemos pronto!</p>
    </div>`;

    const mailOptions = {
        from: `"${process.env.SMTP_SENDER_NAME || 'Conexión Solidaria'}" <${process.env.SMTP_USER || 'admin@conexionsolidaria.org'}>`,
        to: emailDestino,
        subject: `¡Inscripción Confirmada! - ${nombreEvento}`,
        html: cuerpoHtml
    };

    return await transporter.sendMail(mailOptions);
};

const enviarCancelacionInscripcion = async (emailDestino, nombre, eventoId, nombreEvento) => {
    const cuerpoHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #e74c3c; text-align: center;">Cancelación de Inscripción</h2>
        <p style="color: #333333; font-size: 15px;">Hola <strong>${nombre}</strong>,</p>
        <p style="color: #555555; font-size: 14px; line-height: 1.5;">Te confirmamos que hemos procesado exitosamente tu baja para el siguiente evento:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #e74c3c; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 5px 0; font-size: 14px; color: #333333;"><strong>Evento:</strong> ${nombreEvento}</p>
            <p style="margin: 5px 0; font-size: 14px; color: #333333;"><strong>ID del Evento:</strong> #${eventoId}</p>
        </div>

        <p style="color: #555555; font-size: 14px; line-height: 1.5;">Entendemos que los planes cambian. Esperamos poder contar con tu apoyo en futuras actividades.</p>
    </div>`;

    const mailOptions = {
        from: `"${process.env.SMTP_SENDER_NAME || 'Conexión Solidaria'}" <${process.env.SMTP_USER || 'admin@conexionsolidaria.org'}>`,
        to: emailDestino,
        subject: `Cancelación de Inscripción - ${nombreEvento}`,
        html: cuerpoHtml
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { 
    enviarCorreoVerificacionOTP, 
    enviarCorreoRegistro,
    enviarConfirmacionInscripcion,
    enviarCancelacionInscripcion
};