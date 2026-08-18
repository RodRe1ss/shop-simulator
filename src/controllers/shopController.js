const shopServices = require("../services/shopServices");
const NotFoundError = require("../errors/NotFoundError");

const create = async (req, res, next) => {
  try {
    const { playerId, name } = req.body;

    const shop = await shopServices.create(playerId, name);

    res.status(201).json(shop);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const shop = await shopServices.getById(req.params.id);

    if (!shop) {
      throw new NotFoundError("Shop not found!");
    }

    res.json(shop);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const shopId = req.params.id;
    const status = req.body?.status;

    const result = await shopServices.updateStatus(shopId, status);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getById,
  updateStatus,
};
