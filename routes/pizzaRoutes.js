const { Router } = require("express");
const express = require("express");

const authController = require("../controllers/authController");
const pizzaController = require("../controllers/pizzaController");

const router = express.Router();
router
  .route("/")
  .get(pizzaController.getAllPizza)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    pizzaController.insertPizza
  );

router
  .route("/:id")
  .get(pizzaController.getPizza)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    pizzaController.updatePizza
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    pizzaController.deletePizza
  );

module.exports = router;
