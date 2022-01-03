const { Router } = require("express");
const express = require("express");

const authController = require("../controllers/authController");
const toppingsController = require("../controllers/toppingsController");

const router = express.Router();

router
  .route("/")
  .get(toppingsController.getAllToppings)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    toppingsController.createToppings
  );

  router
  .route("/:id")
  .get(toppingsController.getTopping)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    toppingsController.updateTopping
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    toppingsController.deleteTopping
  );
module.exports = router;

//Routes
