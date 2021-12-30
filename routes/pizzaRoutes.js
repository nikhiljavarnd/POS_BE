const { Router } = require("express");
const express = require("express");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const authController = require("../controllers/authController");
const pizzaController = require("../controllers/pizzaController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

const router = express.Router();
router
  .route("/")
  .get(pizzaController.getAllPizza)
  .post(
    upload.single("image"),
    authController.protect,
    authController.restrictTo("admin"),
    pizzaController.insertPizza
  );

router
  .route("/:id")
  .get(pizzaController.getPizza)
  .patch(
    upload.single("image"),
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
