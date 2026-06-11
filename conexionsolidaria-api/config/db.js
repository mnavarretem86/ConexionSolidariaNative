const sql = require('mssql');
require('dotenv').config(); 

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true 
    }
};

const pool = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server con éxito');
        return pool;
    })
    .catch(err => console.log('Error de conexión a la DB: ', err));

module.exports = {
    sql,
    pool
};