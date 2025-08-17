const mongoose = require("mongoose");

const userschema = mongoose.schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: string,
  },
  emailId: {
    type: string,
  },
  password: {
    type: string,
  },
  age: {
    type: number,
  },
  gender: {
    type: string,
  },
});

const user=mongoose.model("user","userschema");

module.exports=user;