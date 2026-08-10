const sql = require("../db");

const getByShopId = async (shopId) => {
  return await sql`
    SELECT 
        products.id,
        products.name,
        products.buy_price,
        products.sell_price,
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

const addStock = async (shopId, productId, quantity, db = sql) => {
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

module.exports = {
  getByShopId,
  getProduct,
  addStock,
};

const test = async () => {
  try {
    const stock = await getByShopId("shop:47XNU8SlyOk9xtptWXNy6");
    stock && console.log("Stock: ", stock);

    // const item = await getItem("shop:47XNU8SlyOk9xtptWXNy6", stock[1].id);
    // console.log("Item: ", item);

    // const addedStock = await addStock(
    //   "shop:47XNU8SlyOk9xtptWXNy6",
    //   stock[1].id,
    //   3,
    // );
    // console.log("Added Stock: ", addedStock);

    // const newItem = await addStock(
    //   "shop:47XNU8SlyOk9xtptWXNy6",
    //   "prod:mT7vK3xQp9LcR2nYw5BjH",
    //   3,
    // );
    // console.log("New Item: ", newItem);

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
