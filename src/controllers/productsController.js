const productsServices = require("../services/productsServices");

const getAll = async (req, res, next) => {
  try {
    const products = await productsServices.getAll();

    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await productsServices.getById(req.params.id);

    res.json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
};
