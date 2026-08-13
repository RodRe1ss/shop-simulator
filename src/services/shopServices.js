const shopRepository = require("../repositories/shopRepository");
const playerRepository = require("../repositories/playerRepository");

const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

const create = async (playerId, name) => {
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

const getById = async (id) => {
  return await shopRepository.getById(id);
};

module.exports = {
  create,
  getById,
};
