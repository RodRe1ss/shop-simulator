// Repositories
const productsRepository = require("../repositories/productsRepository");
const shopRepository = require("../repositories/shopRepository");
const inventoryRepository = require("../repositories/inventoryRepository");
const supplierProductsRepository = require("../repositories/supplierProductsRepository");
const suppliersRepository = require("../repositories/suppliersRepository");

// Error Classes
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");

// SQL DB
const sql = require("../db");

// Services
const getShopInventory = async (shopId) => {
  if (!shopId) {
    throw new ValidationError("Shop ID is required");
  }

  const existingShop = shopRepository.getById(shopId);

  if (!existingShop) {
    throw new NotFoundError("Shop doesn't exist");
  }

  return await inventoryRepository.getByShopId(shopId);
};

const buyStock = async (shopId, productId, supplierId, quantity) => {
  if (!shopId) {
    throw new ValidationError("Shop ID required!");
  }

  if (!productId) {
    throw new ValidationError("Product ID required!");
  }

  if (!supplierId) {
    throw new ValidationError("Supplier ID required!");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new ValidationError("Quantity must be a positive integer");
  }

  const shop = await shopRepository.getById(shopId);
  if (!shop) {
    throw new NotFoundError("Shop not found!");
  }

  const product = await productsRepository.getById(productId);
  if (!product) {
    throw new NotFoundError("Product not found!");
  }

  const supplier = await suppliersRepository.getSupplierById(supplierId);
  if (!supplier) {
    throw new NotFoundError("Supplier not found!")
  }

  const supplierProduct = await supplierProductsRepository.getSupplierProduct(supplierId, productId);
  if (!supplierProduct) {
    throw new NotFoundError("Supplier doesn't sell this product!");
  }

  const cost = supplierProduct.price * quantity;

  if (shop.balance < cost) {
    throw new Error("Insufficient shop balance!");
  }

  await sql.begin(async (tx) => {
    await shopRepository.deductBalance(shopId, cost, tx);
    await inventoryRepository.addStock(shopId, productId, quantity, tx);
  })

  return {
    productId,
    quantity,
    cost
  }
};


module.exports = {
  getShopInventory,
  buyStock,
};


const test = async () => {

  try {
    const stock = await buyStock("shop:47XNU8SlyOk9xtptWXNy6","prod:V1StGXR8_Z5jdHi6B-myT", "splr:Q7mX2vL9kR4pT8nYc5HdW", 12);
    console.log("Stock: ", stock)

    // const result = await testTransaction();
    // console.log("Transaction Result: ", result)

    // const deducted = await shopRepository.deductBalance(
    //   "shop:47XNU8SlyOk9xtptWXNy6",
    //   "Hello",
    // );
    // deducted && console.log("Deducted: ", deducted);
    // const result = await testTransaction();

    // console.log("Transaction Result: ", result);

    // const stock = await getShopInventory("shop:47XNU8SlyOk9xtptWXNy6");
    // stock && console.log("Stock: ", stock);

    // const addedStock = await addStock(
    //   "shop:47XNU8SlyOk9xtptWXNy6",
    //   stock[1].id,
    //   "5",
    // );

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

// test()
