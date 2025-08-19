const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 7,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 10,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      trim: true,
      maxLength: 14,
    },
    age: {
      type: Number,
      trim: true,
      min: 18,
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender not valid");
        }
      },
    },
    photourl: {
      type: String,
      trim: true,
      default:
        "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png",
    },
    about: {
      type: String,
      trim: true,
      default: "This is a default string",
    },
    skills: {
      type: [String],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userschema);

module.exports = User;
