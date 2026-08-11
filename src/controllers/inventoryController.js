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

const buyStock = async (req, res, next) => {
  try {
    const shopId = req.params.shopId;
    const {
      productId,
      supplierId,
      quantity,
    } = req.body;

    const result = await inventoryServices.buyStock(shopId, productId, supplierId, quantity);

    console.log(result)
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getShopInventory,
  buyStock,
};
