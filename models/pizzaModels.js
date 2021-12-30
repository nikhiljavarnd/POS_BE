const mongoose = require('mongoose');
const validator = require('validator');


const pizzaSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A Pizza must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A Pizza Name must have less or equal 40 characters'],
      minlength: [4, 'A Pizza Name must at least 4 characters'],
    },
    price: {
      type: Number,
      required: [true, 'A Pizza must have a price'],
    },
    description: {
      type: String,
      required: [true, 'A Pizza must have a Description'],
      minlength: [10, 'A Pizza Name must at least 10 characters'],
    },
    image:{
        type: String,
        required: [true, 'A Pizza must have a Image'],
    },
 
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  });

  const Pizza = mongoose.model('Pizza',pizzaSchema);
  module.exports = Pizza;
  