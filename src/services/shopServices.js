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

const updateStatus = async (shopId, status) => {
  if (!shopId) {
    throw new ValidationError("Shop ID required!");
  }

  if (!status) {
    throw new ValidationError("Status required");
  }

  const shop = await shopRepository.getById(shopId);
  if (!shop) {
    throw new NotFoundError("Shop not found!");
  }

  if (!["CLOSED", "OPEN"].includes(status)) {
    throw new ConflictError("Invalid status!");
  }

  return await shopRepository.updateStatus(shopId, status);
};

const updateName = async (shopId, name) => {
  if (!shopId) {
    throw new ValidationError("Shop ID required!");
  }

  if (!name) {
    throw new ValidationError("Name required");
  }

  const shop = await shopRepository.getById(shopId);
  if (!shop) {
    throw new NotFoundError("Shop not found!");
  }

  return await shopRepository.updateName(shopId, name);
};

module.exports = {
  create,
  getById,
  updateName,
};
