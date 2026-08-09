const productsRepository = require("../repositories/productsRepository.js");

const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");

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

const test = async () => {
  try {
    const all = await getProducts();
    all && console.log("All results: ", all);

    const one = await getProductById("");
    one && console.log("One result: ", one);

    return;
  } catch (error) {
    console.log(error);
    console.log(error.code);
    console.log(error.table_name);
    console.log(error.constraint_name);
    console.log(error.detail);
    return;
  } finally {
    process.exit(0);
  }
};

// test();
