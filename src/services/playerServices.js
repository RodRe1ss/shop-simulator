const playerRepository = require("../repositories/playerRepository");

const ValidationError = require("../errors/ValidationError");


const create = async (username) => {
  if (!username) {
    throw new ValidationError("Username is required");
  }

  if (username.trim().length < 3) {
    throw new ValidationError("Username must be at least 3 characters.");
  }

  return await playerRepository.create(username.trim());
};

const getById = async (id) => {
  return await playerRepository.getById(id);
};

module.exports = {
  create,
  getById,
};



