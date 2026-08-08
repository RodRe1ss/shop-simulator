const inventoryServices = require("../services/inventoryServices");

const getShopInventory = async (req, res) => {
  try {
    const inventory = await inventoryServices.getShopInventory(
      req.params.shopId,
    );
    res.json(inventory);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const addStock = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const { productId, quantity } = req.body;

    const item = inventoryServices.addStock(shopId, productId, quantity);

    res.json(item);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  getShopInventory,
  addStock,
};
