const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose.connect(
    "mongodb+srv://ramji:xwIyF2ogbE919mUW@cluster0.55l7kus.mongodb.net/devTinder"
  ); //it return promise
};


module.exports = connectdb;