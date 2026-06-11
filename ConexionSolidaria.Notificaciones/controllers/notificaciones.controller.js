const mailService = require('../services/mail.service');
const qrService = require('../services/qr.service'); 

const enviarCodigoOTP = async (req, res) => {
    try {
        const { emailDestino, nombre, tokenOTP } = req.body;

        if (!emailDestino || !nombre || !tokenOTP) {
            return res.status(400).json({
                success: false,
                message: "Faltan parámetros obligatorios (emailDestino, nombre o tokenOTP)."
            });
        }

        await mailService.enviarCorreoVerificacionOTP(emailDestino, nombre, tokenOTP);

        return res.status(200).json({
            success: true,
            message: "Código de verificación OTP enviado con éxito a través del microservicio."
        });
    } catch (error) {
        console.error("[ERROR_NOTIFICACIONES_CTRL_OTP]:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno en el microservicio al procesar el correo OTP.",
            error: error.message
        });
    }
};

const enviarRegistroBienvenida = async (req, res) => {
    try {
        const { emailDestino, nombre, passwordTemporal, dni } = req.body;

        if (!emailDestino || !nombre || !passwordTemporal || !dni) {
            return res.status(400).json({
                success: false,
                message: "Faltan parámetros obligatorios para el registro definitivo (emailDestino, nombre, passwordTemporal o dni)."
            });
        }

        const qrDataUrl = await qrService.generarQrVoluntario(dni);

        await mailService.enviarCorreoRegistro(emailDestino, nombre, passwordTemporal, qrDataUrl);

        return res.status(200).json({
            success: true,
            message: "Correo de bienvenida oficial y QR despachados con éxito."
        });
    } catch (error) {
        console.error("[ERROR_NOTIFICACIONES_CTRL_REGISTRO]:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno en el microservicio al procesar el correo de registro definitivo.",
            error: error.message
        });
    }
};


const enviarConfirmacionInscripcion = async (req, res) => {
    try {
        const { emailDestino, nombre, eventoId, nombreEvento } = req.body;

        if (!emailDestino || !nombre || !eventoId || !nombreEvento) {
            return res.status(400).json({
                success: false,
                message: "Faltan parámetros obligatorios (emailDestino, nombre, eventoId o nombreEvento)."
            });
        }

        await mailService.enviarConfirmacionInscripcion(emailDestino, nombre, eventoId, nombreEvento);

        return res.status(200).json({
            success: true,
            message: "Correo de confirmación de inscripción enviado con éxito a través del microservicio."
        });
    } catch (error) {
        console.error("[ERROR_NOTIFICACIONES_CTRL_INSCRIPCION]:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno en el microservicio al procesar el correo de inscripción.",
            error: error.message
        });
    }
};

const enviarCancelacionInscripcion = async (req, res) => {
    try {
        const { emailDestino, nombre, eventoId, nombreEvento } = req.body;

        if (!emailDestino || !nombre || !eventoId || !nombreEvento) {
            return res.status(400).json({
                success: false,
                message: "Faltan parámetros obligatorios (emailDestino, nombre, eventoId o nombreEvento)."
            });
        }

        await mailService.enviarCancelacionInscripcion(emailDestino, nombre, eventoId, nombreEvento);

        return res.status(200).json({
            success: true,
            message: "Correo de cancelación de inscripción enviado con éxito a través del microservicio."
        });
    } catch (error) {
        console.error("[ERROR_NOTIFICACIONES_CTRL_DESINSCRIPCION]:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno en el microservicio al procesar el correo de cancelación.",
            error: error.message
        });
    }
};

module.exports = {
    enviarCodigoOTP,
    enviarRegistroBienvenida,
    enviarConfirmacionInscripcion,
    enviarCancelacionInscripcion
};