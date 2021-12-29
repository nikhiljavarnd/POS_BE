const mongoose = require("mongoose");
const validator = require("validator");

const toppingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please select a topping"],
  },
  price: {
    type: String
  },
});

toppingsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("toppings", toppingsSchema);
