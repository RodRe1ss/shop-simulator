const sql = require("../db");

const getBySupplierId = async (supplierId) => {
  return await sql`
    SELECT * FROM supplier_products
    WHERE supplier_id = ${supplierId};`;
};

const getProductBySupplierId = async (supplierId, productId) => {
  return (
    await sql`
    SELECT * FROM supplier_products
    WHERE supplier_id = ${supplierId}
    AND product_id = ${productId};`
  )[0];
};

module.exports = {
  getBySupplierId,
  getProductBySupplierId,
};

