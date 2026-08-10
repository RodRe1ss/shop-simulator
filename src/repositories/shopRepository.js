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


const updateBalance = async (id, amount) => {
  return (await sql`
    UPDATE shops
    SET balance = balance - ${amount}
    WHERE id = ${id}
    AND balance >= ${amount}
    RETURNING balance;`)[0];
}

module.exports = {
  create,
  getById,
  getByPlayerId,
  updateBalance
};

const test = async () => {
  try {
    // const created = await create("plyr:jwGDIxrp0COFfi5bJJxsQ", "test123");
    // created && console.log("Created: ", created);

    // if (created) {
    //   const shop = await getById(created.id);
    //   console.log("Shop: ", shop);

    //   const playerShop = await getByPlayerId(created.player_id);
    //   console.log("Player Shop: ", playerShop);
    // }
    const { balance } = await getById("shop:47XNU8SlyOk9xtptWXNy6");

    console.log("Current Balance: ", balance);

    const newBalance = await updateBalance("shop:47XNU8SlyOk9xtptWXNy6", balance + 50);

    console.log("New Balance: ",newBalance);
    return;
  } catch (error) {
    console.log(error)
    console.log(error.code);
    console.log(error.table_name);
    console.log(error.constraint_name);
    console.log(error.detail);
    return;
  } finally {
    process.exit(0);
  }
};

test();
