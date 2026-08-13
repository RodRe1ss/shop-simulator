const sql = require("../db");


const getByShopId = async (shopId) => {
  return await sql`
    SELECT 
        products.id,
        products.name,
        inventory.sell_price,
        inventory.quantity
    FROM inventory
    JOIN products
        ON inventory.product_id = products.id
    WHERE inventory.shop_id = ${shopId}
    ORDER BY products.name;`;
};

const getProduct = async (shopId, productId) => {
  return (
    await sql`
        SELECT * FROM inventory
        WHERE shop_id = ${shopId}
        AND product_id = ${productId}`
  )[0];
};

const increaseStock = async (shopId, productId, quantity, db = sql) => {
  return (
    await db`
    INSERT INTO inventory (shop_id, product_id, quantity)
    VALUES (${shopId}, ${productId}, ${quantity})
    ON CONFLICT (shop_id, product_id)
    DO UPDATE SET
    quantity = inventory.quantity + EXCLUDED.quantity
    RETURNING *;`
  )[0];
};

const decreaseStock = async (shopId, productId, quantity, db = sql) => {
  return (await db`
  UPDATE inventory
  SET quantity = quantity - ${quantity}
  WHERE shop_id = ${shopId}
  AND product_id = ${productId}
  AND quantity >= ${quantity}
  RETURNING quantity;`)[0];
}

module.exports = {
  getByShopId,
  getProduct,
  increaseStock,
  decreaseStock
};
