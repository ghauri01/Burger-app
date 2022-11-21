const User = require("../../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Logout = async (req, res) => {
  const token = req.body.data;
  console.log(token);
  if (token) {
   // const verify = await User.verifyJWTAuthToken (token);
    //console.log(verify);
    const jwtTokenVerify = jwt.verify(token, process.env.JWTTOKEN);
    console.log(jwtTokenVerify);
    const DeleteToken = await User.deleteJWTAuthToken(jwtTokenVerify._id);
    console.log("Delete TOken ->", DeleteToken);
    res.status(200).send ({message:'The User Jwt Token is Deleted'});
  } else {
    res.status(400);
  }
};

module.exports = Logout;
