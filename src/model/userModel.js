const { Schema, models, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    // required: [true, "Username is required"],
    // match: [
    //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique",
    // ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  image: {
    type: String,
  },
  contactStatus: {
    type: Boolean,
  },
  handle: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userModel = models.user || model("user", userSchema);

export default userModel;
