
const { promisify } = require("util");

const Toppings = require("../models/toppingsModels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//List Toppings
exports.getAllToppings = catchAsync(async (req, res, next) => {
  const toppings = await Toppings.find();

  res.status(200).json({
    status: "success",
    results: toppings.length,
    data: {
      toppings,
    },
  });
});

//create toppings
exports.createToppings = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
 
  const newToppingsData = {
    name,
    price,   
  };

  const newToppings = await Toppings.create(newToppingsData);

  res.status(201).json({
    status: "success",
    data: {
      Toppings: newToppings,
    },
  });
});


exports.getTopping = catchAsync(async (req, res, next) => {
  const toppings = await Toppings.findById(req.params.id);
  if (!toppings) {
    return next(new AppError("No Toppings found with this id", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      Toppings: toppings,
    },
  });
});

exports.updateTopping = catchAsync(async (req, res, next) => {
  const topping = await Toppings.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!topping) {
    return next(new AppError("No Topping found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      topping,
    },
  });
});

//Delete the toppings with ID
exports.deleteTopping = catchAsync(async (req, res, next) => {
  const topping = await Toppings.findByIdAndDelete(req.params.id);

  if (!topping) {
    return next(new AppError("No topping found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});