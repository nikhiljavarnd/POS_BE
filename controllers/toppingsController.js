
const { promisify } = require("util");

const Toppings = require("../models/toppingsModels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.listToppings = catchAsync(async (req, res, next) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Toppings.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      return next(
        new AppError("Error occurred while retrieving toppings.", 500)
      );
    });
});

exports.createToppings = catchAsync(async (req, res, next) => {
  // Validate request
  if (!req.body.name) {
      return next(
      new AppError("Request can not be empty!", 400)
    );
  }

  // Create a Tutorial
  const toppings = new Toppings({
    name: req.body.name,
    price: req.body.price
  });

  // Save Tutorial in the database
  toppings
    .save(toppings)
    .then(data => {
      res.send(data);
    })
    .catch(err => {      
      return next(
        new AppError("Some error occurred while creating the Toppings.", 500)
      );
    });
});

exports.updateToppings = catchAsync(async (req, res, next) => {

  if (Object.keys(req.body).length === 0) {
    return next(
      new AppError("Data to update can not be empty!", 400)
    );
  }

  const id = req.params.id;

  Toppings.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {       
        return next(
          new AppError(`Cannot update Topping with id=${id}. Maybe Topping was not found!`, 404)
        );
      } else res.send({ message: "Topping was updated successfully." });
    })
    .catch(err => {     
      return next(
        new AppError("Error updating Topping with id=" + id, 500)
      );
    });
 
});

exports.deleteToppings = catchAsync(async (req, res, next) => {

  const id = req.params.id;

  Toppings.findByIdAndRemove(id)
    .then(data => {
      if (!data) {       
        return next(
          new AppError(`Cannot delete Topping with id=${id}. Maybe Topping was not found!`, 404)
        );
      } else {
        res.send({
          message: "Topping was deleted successfully!"
        });
      }
    })
    .catch(err => {     
      return next(
        new AppError( "Could not delete Topping with id=" + id, 500)
      );
    });
});