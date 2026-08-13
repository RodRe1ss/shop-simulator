const express = require("express");

const shopController = require("../controllers/shopController");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router.post("/", shopController.create);

router.get("/:id", shopController.getById);

router.get("/:shopId/inventory", inventoryController.getInvByShopId);

router.post("/:shopId/inventory/buy-stock", inventoryController.buyInvProduct);

router.post("/:shopId/inventory/sell-stock", inventoryController.sellInvProduct)

module.exports = router;
