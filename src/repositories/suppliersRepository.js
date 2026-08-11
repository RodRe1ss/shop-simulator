const sql = require("../db");

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

const test = async () => {
    try {
        // const suppliers = await getSuppliers();
        // console.log(suppliers);

        const supplier = await getSupplierById('splr:W3kR8mX5qL2vN7tY9cHdP');
        console.log(supplier);
    } catch (error) {
        console.log(error)
    } finally {
        process.exit(0);
    }
}

// test();