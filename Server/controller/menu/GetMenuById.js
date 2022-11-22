const User = require("../../models/user");
const Menu = require("../../models/menu");

// Get Menu Items of User by ID
const GetMenuById = async (req, res) => {
  try {
    const token = req.body.data;
    if (token) {
      const verifyToken = await User.verifyJWTAuthToken(token);
      const userIdCheckExits = await Menu.findOne({ userID:verifyToken._id }).exec();
      if (userIdCheckExits) {
        console.log (verifyToken);
        console.log (userIdCheckExits.userID);
        userIdCheckExits.userID = "";
        console.log (userIdCheckExits);
        res.status(200).json(userIdCheckExits);
      } else {
        res.status(400).send({ message: "The Data is not save" });
      }
    } else {
      res.status(400).send({ message: "The is some problem while loading" });
    }
  } catch (err) {
    res.status(400).send({ message: "The is some problem while loading" });
    console.log("Error in Get Menu By ID ->", err);
  }
};

module.exports = GetMenuById;
