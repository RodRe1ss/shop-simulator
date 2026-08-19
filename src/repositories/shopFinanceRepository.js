const sql = require("../db");

const create = async (shopId, db = sql) => {
  return (
    await db`
    INSERT INTO shop_finances (shop_id)
    VALUES (${shopId})
    RETURNING *`
  )[0];
};


const updateTotalEarned = async (shopId, amountEarned, db = sql) => {
  return (
    await db`
    UPDATE shop_finances
    SET amount_earned = amount_earned + ${amountEarned}
    WHERE shop_id = ${shopId}
    RETURNING *;`
  )[0];
};

const updateTotalSpent = async (shopId, amountSpent, db = sql) => {
  return (
    await db`
    UPDATE shop_finances
    SET amount_spent = amount_spent + ${amountSpent}
    WHERE shop_id = ${shopId}
    RETURNING *;`
  )[0];
};

module.exports = {
  create,
  updateTotalEarned,
  updateTotalSpent,
};
