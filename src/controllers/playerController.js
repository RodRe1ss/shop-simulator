const playerServices = require("../services/playerServices");
const NotFoundError = require("../errors/NotFoundError");

const create = async (req, res, next) => {
  try {
    const { username } = req.body;

    const player = await playerServices.createPlayer(username);

    res.status(201).json(player);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const player = await playerServices.getPlayerById(req.params.id);

    if (!player) {
      throw new NotFoundError("Player not found.");
    }

    res.status(200).json(player);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getById,
};
