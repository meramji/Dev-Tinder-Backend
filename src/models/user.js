const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 8,
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid eamil address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      trim: true,
      maxLength: 96,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      trim: true,
      min: 18,
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender",
      },
    },
    photourl: {
      type: String,
      trim: true,
      default:
        "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo urlnaddress" + value);
        }
      },
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

userschema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userschema.methods.validatePassword = async function (passwordinputbyuser) {
  const user = this;
  const passwordhash = user.password;

  const ispasswordvalid = await bcrypt.compare(
    passwordinputbyuser,
    passwordhash
  );
  return ispasswordvalid;
};

const User = mongoose.model("User", userschema);

module.exports = User;
