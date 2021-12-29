
const { promisify } = require("util");

const Toppings = require("../models/toppingsModels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//list toppings 
exports.listToppings = catchAsync(async (req, res, next) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  // find the toppings by ID
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

//create toppings
exports.createToppings = catchAsync(async (req, res, next) => {
  // Validate request
  if (!req.body.name) {
      return next(
      new AppError("Request can not be empty!", 400)
    );
  }

  // Create a Topping
  const toppings = new Toppings({
    name: req.body.name,
    price: req.body.price
  });

  // Save topping in the database
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

//Update Toppings
exports.updateToppings = catchAsync(async (req, res, next) => {

  //validate 
  if (Object.keys(req.body).length === 0) {
    return next(
      new AppError("Data to update can not be empty!", 400)
    );
  }

  const id = req.params.id;  
  //Find the topping by id and update
  Toppings.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {       
        return next(
          new AppError(`Cannot update Topping with id=${id}.Topping was not found!`, 404)
        );
      } else res.send({ message: "Topping updated successfully." });
    })
    .catch(err => {     
      return next(
        new AppError("Error updating Topping with id=" + id, 500)
      );
    });
 
});

//Delete the toppings with ID
exports.deleteToppings = catchAsync(async (req, res, next) => {

  const id = req.params.id;

  //find toppings by ID and delete
  Toppings.findByIdAndRemove(id)
    .then(data => {
      if (!data) {       
        return next(
          new AppError(`Cannot delete Topping with id=${id}.Topping was not found!`, 404)
        );
      } else {
        res.send({
          message: "Topping  deleted successfully!"
        });
      }
    })
    .catch(err => {     
      return next(
        new AppError( "Could not delete Topping with id=" + id, 500)
      );
    });
});