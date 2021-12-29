const mongoose = require("mongoose");

const toppingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please select a topping"],
  },
  price: {
    type: Number
  },
});

//Formatiing the response 
toppingsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("toppings", toppingsSchema);
