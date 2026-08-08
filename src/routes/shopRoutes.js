const express = require("express");
const shopController = require("../controllers/shopController");
const inventoryController = require("../controllers/inventoryController");

const router = express.Router();

router.post("/", shopController.create);

router.get("/:id", shopController.getById);

router.get("/:shopId/inventory", inventoryController.getShopInventory);

router.post("/:shopId/inventory", inventoryController.addStock);

module.exports = router;
