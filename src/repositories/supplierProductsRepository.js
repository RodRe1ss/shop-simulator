const sql = require("../db")


const getSupplierAll = async (supplierId) => {
    return await sql`
    SELECT * FROM supplier_products
    WHERE supplier_id = ${supplierId};`;
}

const getSupplierProduct = async (supplierId, productId) => {
  return (await sql`
    SELECT * FROM supplier_products
    WHERE supplier_id = ${supplierId}
    AND product_id = ${productId};`)[0];
}

module.exports = {
    getSupplierAll,
    getSupplierProduct
}

const test = async () => {
  try {
    const supplierAllStock = await getSupplierAll('splr:Q7mX2vL9kR4pT8nYc5HdW');
    supplierAllStock && console.log("All Supplier Stock: ", supplierAllStock);

    const supplierProduct = await getSupplierProduct('splr:Q7mX2vL9kR4pT8nYc5HdW','prod:Qp7kL2mNx9R4vBcYt6HjW');
    supplierProduct && console.log("Supplier Product: ", supplierProduct);

    return;
  } catch (error) {
    console.log(error);
    error.code && console.log(error.code);
    error.table_name && console.log(error.table_name);
    error.constraint_name && console.log(error.constraint_name);
    error.detail && console.log(error.detail);
    return;
  } finally {
    process.exit(0);
  }
};

// test();
