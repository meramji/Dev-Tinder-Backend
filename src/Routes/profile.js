const express = require("express");
const profileRouter = express.Router();
const { userauth } = require("../middlewares/auth.js");

profileRouter.get("/profile", userauth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = { profileRouter };
