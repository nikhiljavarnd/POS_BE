const { Router } = require("express");
const express = require("express");

const toppingsController = require("../controllers/toppingsController");

const router = express.Router();

router.get("/listToppings", toppingsController.listToppings);
router.post("/createToppings", toppingsController.createToppings);
router.patch("/updateToppings/:id", toppingsController.updateToppings);
router.delete("/deleteToppings/:id", toppingsController.deleteToppings);

module.exports = router;

//Routes
