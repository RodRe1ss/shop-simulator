const sql = require("../db");


const getAll = async () => {
    return await sql`
    SELECT * FROM suppliers`;
}

const getById = async (id) => {
    return (await sql`
    SELECT * FROM suppliers
    WHERE id = ${id};`)[0];
}

module.exports = {
    getAll,
    getById,
}


