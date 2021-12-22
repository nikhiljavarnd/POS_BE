const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user Must have a Name"],
  },

  email: {
    type: String,
    required: [true, "user Must have an Email ID"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "user must enter password"],
    select: false,
    minlength: 8,
  },

  passwordConfirm: {
    type: String,
    required: [true, "user must enter password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same",
    },
  },

  passwordChangedAt: Date,

  userRole: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  contact: {
    type: String,
    validate: function (el) {
      validator.isMobilePhone(el, "en-IN");
    },
    message: "Please provide a valid Contact Number",
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function is password was actually modified
  if (!this.isModified("password")) return next();

  // hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("user", userSchema);
