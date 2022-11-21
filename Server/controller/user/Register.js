
const User = require("../../models/user");
require("dotenv").config();
const { hashPassword } = require("../../utils/hashedPassword");


// Registration Controller
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExits = await User.findOne({ email }).exec();
    if (!userExits) {
      // Hashed the password
      const hashedpassword = await hashPassword(password);
      // Create new User Object
      const user = await new User({
        name: name,
        email: email,
        password: hashedpassword,
      });
      await user.save();
      console.log("User Registerd.....");
      res.status(200).send("User Sucesfully Registerd....");
    } else {
      console.log("User Already Registerd");
      res.status(400).send("User Already Registerd");
    }
  } catch (error) {
    res.status(400).send("User Already Registerd");
    console.error("Error in Registration ->", error);
  }
};

module.exports = Register;