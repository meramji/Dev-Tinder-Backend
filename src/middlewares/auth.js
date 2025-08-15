const adminauth= (req, res, next) => {
  console.log("authorization request is checking");
  const token = "xyz";
  const isadminauthorized = token === "xyz";
  if (!isadminauthorized) {
    res.send("unathorized request");
  } else {
    next();
  }
};
const userauth= (req, res, next) => {
  console.log("authorization request is checking");
  const token = "xsqji";
  const isadminauthorized = token === "xyz";
  if (!isadminauthorized) {
    res.send("unathorized request");
  } else {
    next();
  }
};
module.exports={adminauth,userauth};