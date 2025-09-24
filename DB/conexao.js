import mysql from 'mysql2/promise';

export default async function conectar() {
    if (global.poolConexoes) {
        return await global.poolConexoes.getConnection();
    }

    global.poolConexoes = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'saberonline_atividade',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        queueLimit: 0
    }); 

    return await global.poolConexoes.getConnection();
}