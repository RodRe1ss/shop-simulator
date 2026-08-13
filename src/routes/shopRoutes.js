const express = require("express");

const shopController = require("../controllers/shopController");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router.post("/", shopController.create);

router.get("/:id", shopController.getById);

router.get("/:shopId/inventory", inventoryController.getByShopId);

router.post("/:shopId/inventory/buy-product", inventoryController.buyProduct);

router.post("/:shopId/inventory/sell-product", inventoryController.sellProduct)

module.exports = router;
