const productsRepository = require("../repositories/productsRepository.js");

const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");


const getAll = async () => {
  return await productsRepository.getAll();
};

const getById = async (id) => {
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
  getAll,
  getById,
};


