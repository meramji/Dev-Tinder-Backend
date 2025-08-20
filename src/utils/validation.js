const validator = require("validator");

const validateSignupData = (req) => {
  const { firstname, lastname, emailId, password } = req.body;

  if (!firstname || !lastname) {
    throw new Error(" name is Invalid ");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is Invalid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a stong password");
  }
};

module.exports = { validateSignupData };
