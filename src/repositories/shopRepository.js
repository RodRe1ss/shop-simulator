const sql = require("../db");
const getId = require("../utils/getId");

const create = async (playerId, name) => {
  const id = getId("shop");

  return (
    await sql`
        INSERT INTO shops (id, player_id, name)
        VALUES (${id}, ${playerId}, ${name})
        RETURNING *;`
  )[0];
};

const getById = async (id) => {
  return (
    await sql`
        SELECT * FROM shops
        WHERE id = ${id};`
  )[0];
};

const getByPlayerId = async (playerId) => {
  return (
    await sql`
        SELECT * FROM shops
        WHERE player_id = ${playerId};`
  )[0];
};

const decreaseBalance = async (id, amount, db = sql) => {
  return (
    await db`
    UPDATE shops
    SET balance = balance - ${amount}
    WHERE id = ${id}
    AND balance >= ${amount}
    RETURNING balance;`
  )[0];
};

const increaseBalance = async (id, amount, db = sql) => {
  return (
    await db`
    UPDATE shops
    SET balance = balance + ${amount}
    WHERE id = ${id}
    RETURNING balance;`
  )[0];
};

const updateStatus = async (shopId, status, db = sql) => {
  return (
    await db`
    UPDATE shops
    SET status = ${status}
    WHERE id = ${shopId}
    RETURNING *;`
  )[0];
};

const updateName = async (shopId, name, db = sql) => {
  return (
    await db`
    UPDATE shops
    SET name = ${name}
    WHERE id = ${shopId}
    RETURNING *;`
  )[0];
};

module.exports = {
  create,
  getById,
  getByPlayerId,
  decreaseBalance,
  increaseBalance,
  updateStatus,
  updateName,
};
