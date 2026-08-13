const productsRepository = require("../repositories/productsRepository.js");

const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const testFn = require("../utils/testFn.js");

const getProducts = async () => {
  return await productsRepository.getAll();
};

const getProductById = async (id) => {
  if (!id) {
    throw new ValidationError("Product ID is required");
  }

  const product = await productsRepository.getById(id);

  if (!product) {
    throw new NotFoundError("Product doesn't exist");
  }

  return product;
};

module.exports = {
  getProducts,
  getProductById,
};


