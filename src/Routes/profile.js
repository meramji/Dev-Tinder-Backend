const express = require("express");
const profileRouter = express.Router();
const { userauth } = require("../middlewares/auth.js");
const { validateEditProfile } = require("../utils/validation.js");

profileRouter.get("/profile/view", userauth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
profileRouter.patch("/profile/edit", userauth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit request");
    }

    const loggedInuser = req.user;

    Object.keys(req.body).forEach(
      (keys) => (loggedInuser[keys] = req.body[keys])
    );

    await loggedInuser.save();

    res.send(`${loggedInuser.firstname},your profile is updates sucessfully!`);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});
module.exports = { profileRouter };
 