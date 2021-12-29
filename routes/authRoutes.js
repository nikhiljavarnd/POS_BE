const { Router } = require("express");
const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/abc", authController.protect, authController.login);

module.exports = router;

//Routes
