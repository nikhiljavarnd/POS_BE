const mongoose = require("mongoose");

const toppingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please select a topping"],
    unique: true,
    trim: true,
    maxlength: [40, 'Topping Name must have less or equal 40 characters'],
    minlength: [4, 'Topping Name must at least 4 characters'],
  },
  price: {
    type: Number,
    required: [true, 'A Topping must have a price'],
  },
});

//Formatting the response
toppingsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("toppings", toppingsSchema);
