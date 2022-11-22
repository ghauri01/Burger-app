const User = require("../../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Logout = async (req, res) => {
  const token = req.body.data;
  if (token) {
    // JWT Token Verify
    const jwtTokenVerify = jwt.verify(token, process.env.JWTTOKEN);
    // User Delete JWT TOKEN
    await User.deleteJWTAuthToken(jwtTokenVerify._id);
    // Send Response
    res.status(200).send({ message: "The User Jwt Token is Deleted" });
  } else {
    res.status(400);
  }
};

module.exports = Logout;
