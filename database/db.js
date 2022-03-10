const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cursos",
    password: "root",
    port: 5432,
    max: 20,
    min: 0,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
});

module.exports.getCursos = async () => {
    const client = await pool.connect();
    try {
        const resp = await client.query("SELECT * FROM cursos;");
        return resp.rows;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        client.release();
    }
};

module.exports.createCurso = async (data) => {
    const client = await pool.connect();
    console.log(data);
    const { nombre, nivel, fecha, duracion } = data;
    const query = {
        text: "INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *",
        values: [nombre, nivel, fecha, duracion],
    };
    try {
        const resp = await client.query(query);
        return resp.rows;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        client.release();
    }
};

module.exports.editCurso = async (data) => {
    const client = await pool.connect();
    const { id, nombre, nivel, fecha, duracion } = data;
    const query = {
        text: "UPDATE cursos SET nombre = $1, nivel = $2, fecha = $3, duracion = $4 WHERE id = $5 RETURNING*;",
        values: [nombre, nivel, fecha, duracion, id],
    };
    try {
        const resp = await client.query(query);
        return resp.rows;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        client.release();
    }
};

module.exports.deleteCurso = async (id) => {
    const client = await pool.connect();
    const query = {
        text: "DELETE FROM cursos WHERE id=$1 RETURNING*",
        values: [id],
    };
    try {
        const resp = await client.query(query);
        return resp.rows;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        client.release();
    }
};
