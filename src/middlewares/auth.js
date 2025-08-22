const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userauth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid !!");
    }

    const decodedobj = await jwt.verify(token, "Dev@Tinder$790");

    const { _id } = decodedobj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not find ");
    }

    req.user=user;
    next();
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
};
module.exports = { userauth };
