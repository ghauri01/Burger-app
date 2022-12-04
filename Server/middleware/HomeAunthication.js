const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const HomeAuthication = async (req, res) => {
    let token = req.body.data;
    if (token) {
      const jwtTokenVerify = await User.verifyJWTAuthToken (token);
     // console.log(jwtTokenVerify);
      const loginUser = await User.findOne({
        _id: jwtTokenVerify._id,
        token: token,
      });
      if (loginUser) {
        res.status(200).send("User is Login...");
      }
    } else {
      res.status(400).send ('User not Find');
    }
};

module.exports = HomeAuthication;
