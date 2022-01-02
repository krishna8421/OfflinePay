import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  num: {
    type: Number,
    required: [true, "Please provide a number"],
    length: [10, "Number cannot be more than 14 characters"],
  },
  pass: {
    required: [true, "Please provide a password"],
    type: String,
    minlength: [6, "Password cannot be less than 6 characters"],
  },
  balance: {
    required: [true, "Please provide a balance"],
    type: Number,
    min: [0, "Amount cannot be less than 0"],
  },
  transactions: [String],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
