const shopRepository = require("../repositories/shopRepository");
const playerRepository = require("../repositories/playerRepository");

const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

const createShop = async (playerId, name) => {
  if (!playerId) {
    throw new ValidationError("Player ID is required");
  }

  if (!name || !name.trim()) {
    throw new ValidationError("Shop name is required");
  }

  if (name.trim().length < 3) {
    throw new ValidationError("Shop name must at least be 3 characters");
  }

  const player = await playerRepository.getById(playerId);

  if (!player) {
    throw new NotFoundError("Player not found");
  }

  const existingShop = await shopRepository.getByPlayerId(playerId);

  if (existingShop) {
    throw new ConflictError("Player already owns a shop");
  }

  return await shopRepository.create(playerId, name.trim());
};

const getShopById = async (id) => {
  return await shopRepository.getById(id);
};

module.exports = {
  createShop,
  getShopById,
};

const test = async () => {
  try {
    const created = await createShop("plyr:jwGDIxrp0COFfi5bJJxsQ", "test123");
    console.log("Created: ", created);

    const fetched = await getShopById(created.id);
    console.log("Fetched: ", fetched);
    return;
  } catch (error) {
    error.schema_name !== "public" && console.log(error);
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
