import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  number: {
    type: String,
    required: [true, "Please provide a number"],
    maxlength: [10, "Number cannot be more than 14 characters"],
  },
  password: {
    required: [true, "Please provide a password"],
    type: String,
    minlength: [6, "Password cannot be less than 6 characters"],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
