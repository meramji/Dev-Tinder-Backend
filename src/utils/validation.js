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

const validateEditProfile = (req) => {
  const allowedEditfields = [
    "firstname",
    "lastname",
    "age",
    "photourl",
    "about",
    "gender",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((fields) =>
    allowedEditfields.includes(fields)
  );
  return isEditAllowed;
};

module.exports = { validateSignupData, validateEditProfile };
