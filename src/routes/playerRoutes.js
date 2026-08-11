const express = require("express");

const playerController = require("../controllers/playerController.js");

const router = express.Router();

router.post("/", playerController.create);

router.get("/:id", playerController.getById);

module.exports = router;