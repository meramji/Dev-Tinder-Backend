const express = require("express");
const profileRouter = express.Router();
const { userauth } = require("../middlewares/auth.js");

profileRouter.get("/profile/view", userauth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
profileRouter.patch("/profile/edit",async (req,res)=>{

});
module.exports = { profileRouter };
