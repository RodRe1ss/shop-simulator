// Repositories
const productsRepository = require("../repositories/productsRepository");
const shopRepository = require("../repositories/shopRepository");
const inventoryRepository = require("../repositories/inventoryRepository");
const supplierProductsRepository = require("../repositories/supplierProductsRepository");
const suppliersRepository = require("../repositories/suppliersRepository");

// Error Classes
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

// SQL DB
const sql = require("../db");
const testFn = require("../utils/testFn");

// Services
const getInvByShopId = async (shopId) => {
  if (!shopId) {
    throw new ValidationError("Shop ID is required");
  }

  const existingShop = shopRepository.getById(shopId);

  if (!existingShop) {
    throw new NotFoundError("Shop doesn't exist");
  }

  return await inventoryRepository.getByShopId(shopId);
};

const buyInvProduct = async (shopId, productId, supplierId, quantity) => {
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
    throw new NotFoundError("Supplier not found!");
  }

  const supplierProduct = await supplierProductsRepository.getSupplierProduct(
    supplierId,
    productId,
  );
  if (!supplierProduct) {
    throw new NotFoundError("Supplier doesn't sell this product!");
  }

  const cost = supplierProduct.price * quantity;

  if (shop.balance < cost) {
    throw new ConflictError("Insufficient shop balance!");
  }

  await sql.begin(async (tx) => {
    await shopRepository.decreaseBalance(shopId, cost, tx);
    await inventoryRepository.increaseStock(shopId, productId, quantity, tx);
  });

  return {
    productId,
    quantity,
    cost,
  };
};

const sellInvProduct = async (shopId, productId, quantity) => {
  if (!shopId) {
    throw new ValidationError("Shop ID required!");
  }

  if (!productId) {
    throw new ValidationError("Product ID required!");
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

  const inventoryProduct = await inventoryRepository.getProduct(
    shopId,
    productId,
  );
  if (!inventoryProduct) {
    throw new NotFoundError("Inventory Product not found!");
  }

  if (inventoryProduct.quantity < quantity) {
    throw new ConflictError("Insufficient product inventory amount!");
  }

  const cost = inventoryProduct.sell_price * quantity;

  await sql.begin(async (tx) => {
    await shopRepository.increaseBalance(shopId, cost, tx);
    await inventoryRepository.decreaseStock(shopId, productId, quantity, tx);
  });

  return {
    productId,
    amount: quantity,
    moneyMade: cost,
  };
};

module.exports = {
  getInvByShopId,
  buyInvProduct,
  sellInvProduct,
};

const sellStockFn = {
  title: "Sold",
  fn: sellInvProduct,
  args: ["shop:47XNU8SlyOk9xtptWXNy6", "prod:V1StGXR8_Z5jdHi6B-myT", 1],
};

// testFn(sellStockFn);
