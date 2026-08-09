const playerRepository = require("../repositories/playerRepository");

const ValidationError = require("../errors/ValidationError");

const createPlayer = async (username) => {
  if (!username) {
    throw new ValidationError("Username is required");
  }

  if (username.trim().length < 3) {
    throw new ValidationError("Username must be at least 3 characters.");
  }

  return await playerRepository.create(username.trim());
};

const getPlayerById = async (id) => {
  return await playerRepository.getById(id);
};

module.exports = {
  createPlayer,
  getPlayerById,
};

const test = async () => {
  try {
    const created = await createPlayer("    ");
    console.log("Created: ", created);

    const player = await getPlayerById(created.id);
    console.log("Player: ", player);
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
