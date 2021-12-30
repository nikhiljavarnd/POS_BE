const Pizza = require("../models/pizzaModels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllPizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.find();

  res.status(200).json({
    status: "success",
    results: pizza.length,
    data: {
      pizza,
    },
  });
});

exports.insertPizza = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const image = req.file.filename;

  const newUserData = {
    name,
    description,
    price,
    image,
  };

  const newPizza = await Pizza.create(newUserData);

  res.status(201).json({
    status: "success",
    data: {
      pizza: newPizza,
    },
  });
});

exports.getPizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.findById(req.params.id);
  if (!pizza) {
    return next(new AppError("No pizza found with this id", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      pizza: pizza,
    },
  });
});

exports.updatePizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!pizza) {
    return next(new AppError("No pizza found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      pizza,
    },
  });
});

exports.deletePizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.findByIdAndDelete(req.params.id);

  if (!pizza) {
    return next(new AppError("No pizza found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
