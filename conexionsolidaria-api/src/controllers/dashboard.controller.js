const dashboardService = require('../services/dashboard.service');

const getEventos = async (req, res) => {
    try {
        const data = await dashboardService.getEventos();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo eventos' });
    }
};

const getInscripciones = async (req, res) => {
    try {
        const data = await dashboardService.getInscripciones();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo inscripciones' });
    }
};

module.exports = {
    getEventos,
    getInscripciones
};