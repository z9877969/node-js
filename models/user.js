const { Schema, model } = require("mongoose");
const { regex } = require("../helpers");

const userSchema = Schema(
  {
    name: {
      type: "string",
      //   required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: regex.email,
    },
    password: {
      type: String,
      required: true,
      // min: [8, "Password must be 8 and more charackters"],
      // max: [32, "Password must be 32 charackters and less"],
      minlength: 8,
      maxlength: 32,
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = User;
