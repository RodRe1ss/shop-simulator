const getId = require("../utils/getId");
const sql = require("../db");
const testFn = require("../utils/testFn");

const create = async (username) => {
    const id = getId("plyr")

    return (await sql`
    INSERT INTO players (id, username, created_at)
    VALUES (${id}, ${username}, NOW())
    RETURNING *;`)[0];
}

const getById = async (id) => {
    return (await sql`
        SELECT * FROM players
        WHERE id = ${id};`)[0];
}

module.exports = {
    create,
    getById
}

const createFn = {
  title: "Created",
  fn: create,
  args: ["test123"]
}

// testFn(createFn);
