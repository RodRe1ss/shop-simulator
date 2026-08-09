const shopServices = require("../services/shopServices");
const NotFoundError = require("../errors/NotFoundError");

const create = async (req, res, next) => {
  try {
    const { playerId, name } = req.body;

    const shop = await shopServices.createShop(playerId, name);

    res.status(201).json(shop);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const shop = await shopServices.getShopById(req.params.id);

    if (!shop) {
      throw new NotFoundError("Shop not found!");
    }

    res.status(200).json(shop);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getById,
};
