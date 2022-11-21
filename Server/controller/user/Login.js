
const User = require("../../models/user");
require("dotenv").config();
const { comparePassword } = require("../../utils/hashedPassword");


// Login Controller

const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email }).exec();
      if (user) {
        // Match the hashed Password
        const match = await comparePassword(password, user.password);
        if (match) {
          // Return user to client without password
          user.password = undefined;
  
          // Create JWT TOKEN
          const token = await User.createJWTAuthToken(user);
          console.log("Your JWT Token ->", token);
          // Send user in Response
          res.status(200).json (token);
          return;
        } else {
          res.status(400).send("Wrong User");
        }
      } else {
        console.log("Wrong User....");
        res.status(400).send("Wrong User");
      }
    } catch (error) {
      res.status(400).send("Wrong User");
      console.error("Error in Login ->", error);
    }
  };

module.exports = Login;