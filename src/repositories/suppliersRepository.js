const sql = require("../db");
const testFn = require("../utils/testFn");

const getSuppliers = async () => {
    return await sql`
    SELECT * FROM suppliers`;
}

const getSupplierById = async (id) => {
    return (await sql`
    SELECT * FROM suppliers
    WHERE id = ${id};`)[0];
}

module.exports = {
    getSuppliers,
    getSupplierById,
}


const supplierFn = {
  title: "Supplier",
  fn: getSupplierById,
  args: ["splr:W3kR8mX5qL2vN7tY9cHdP"],
};

// testFn(supplierFn);
