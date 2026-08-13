const sql = require("../db");
const testFn = require("../utils/testFn");

const getSupplierAll = async (supplierId) => {
  return await sql`
    SELECT * FROM supplier_products
    WHERE supplier_id = ${supplierId};`;
};

const getSupplierProduct = async (supplierId, productId) => {
  return (
    await sql`
    SELECT * FROM supplier_products
    WHERE supplier_id = ${supplierId}
    AND product_id = ${productId};`
  )[0];
};

module.exports = {
  getSupplierAll,
  getSupplierProduct,
};

const supplierFn = {
  title: "All Supplier Stock",
  fn: getSupplierAll,
  args: ["splr:Q7mX2vL9kR4pT8nYc5HdW"],
};

// testFn(supplierFn);
