const inventoryServices = require("../services/inventoryServices");

const getByShopId = async (req, res, next) => {
  try {
    const inventory = await inventoryServices.getByShopId(
      req.params.shopId,
    );
    res.json(inventory);
  } catch (err) {
    next(err);
  }
};

const buyProduct = async (req, res, next) => {
  try {
    const shopId = req.params.shopId;
    const {
      productId,
      supplierId,
      quantity,
    } = req.body;

    const result = await inventoryServices.buyProduct(shopId, productId, supplierId, quantity);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const sellProduct = async (req, res, next) => {
  try {
    const { shopId } = req.params

    const {
      productId,
      quantity
    } = req.body

    const result = await inventoryServices.sellProduct(shopId, productId, quantity)

    res.json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getByShopId,
  buyProduct,
  sellProduct
};
