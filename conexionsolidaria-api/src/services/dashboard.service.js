// 1. Importamos 'pool' pero le asignamos el alias 'poolPromise'
const { sql, pool: poolPromise } = require('../../config/db');

const getEventos = async () => {
    // 2. Ahora esto funciona perfectamente con la promesa de tu archivo db.js
    const pool = await poolPromise;

    const result = await pool.request()
        .input('Opcion', sql.Int, 1)
        .execute('USP_DASHBOARD');

    return result.recordset;
};

const getInscripciones = async () => {
    // Reutilizamos la misma lógica
    const pool = await poolPromise;

    const result = await pool.request()
        .input('Opcion', sql.Int, 2)
        .execute('USP_DASHBOARD');

    return result.recordset;
};

module.exports = {
    getEventos,
    getInscripciones
};