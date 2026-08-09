const inventoryServices = require("../services/inventoryServices");

const getShopInventory = async (req, res, next) => {
  try {
    const inventory = await inventoryServices.getShopInventory(
      req.params.shopId,
    );
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

const addStock = async (req, res, next) => {
  try {
    const shopId = req.params.shopId;
    const { productId, quantity } = req.body;

    const item = inventoryServices.addStock(shopId, productId, quantity);

    res.json(item);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getShopInventory,
  addStock,
};
