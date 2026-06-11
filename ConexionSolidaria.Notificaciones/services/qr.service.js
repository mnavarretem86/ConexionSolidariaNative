const QRCode = require('qrcode');

const generarQrVoluntario = async (dni) => {
    try {
        return await QRCode.toDataURL(`VOLUNTARIO-DNI:${dni}`);
    } catch (error) {
        throw new Error('Error al generar el código QR: ' + error.message);
    }
};

module.exports = { generarQrVoluntario };