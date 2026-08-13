const sql = require("../db");


const getAll = async () => {
  return await sql`
        SELECT * FROM products
        ORDER BY name;`;
};

const getById = async (id) => {
  return (
    await sql`
        SELECT * FROM products
        WHERE id = ${id};`
  )[0];
};

module.exports = {
  getAll,
  getById,
};

