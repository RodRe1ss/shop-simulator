const productsRepository = require("../repositories/productsRepository");
const shopRepository = require("../repositories/shopRepository");
const inventoryRepository = require("../repositories/inventoryRepository");

const getShopInventory = async (shopId) => {
  if (!shopId) {
    throw new Error("Shop ID is required");
  }

  const existingShop = shopRepository.getById(shopId);

  if (!existingShop) {
    throw new Error("Shop doesn't exist");
  }

  return await inventoryRepository.getByShopId(shopId);
};

const addStock = async (shopId, productId, quantity) => {
  if (!shopId) {
    throw new Error("Shop ID is required");
  }

  if (!productId) {
    throw new Error("Product ID is required");
  }

  if (quantity === undefined) {
    throw new Error("Quantity is required");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Quantity must be a positive integer");
  }

  const existingShop = shopRepository.getById(shopId);

  if (!existingShop) {
    throw new Error("Shop doesn't exist");
  }

  const existingProduct = productsRepository.getById(productId);

  if (!existingProduct) {
    throw new Error("Product doesn't exist");
  }

  return await inventoryRepository.addStock(shopId, productId, quantity);
};

module.exports = {
  getShopInventory,
  addStock,
};

const test = async () => {
  try {
    const stock = await getShopInventory("shop:47XNU8SlyOk9xtptWXNy6");
    stock && console.log("Stock: ", stock);

    const addedStock = await addStock(
      "shop:47XNU8SlyOk9xtptWXNy6",
      stock[1].id,
      "5",
    );

    // console.log("Added Stock: ", addedStock);

    // const newItem = await addStock(
    //   "shop:47XNU8SlyOk9xtptWXNy6",
    //   "prod:cR3mX7kNp5VjQ9wLt2HsY",
    //   5,
    // );
    // console.log("New Item: ", newItem);

    return;
  } catch (error) {
    console.log(error);
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
