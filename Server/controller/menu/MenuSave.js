const Menu = require("../../models/menu");
const User = require("../../models/user");

// Save data to menu controller

const MenuSave = async (req, res) => {
  try {
    console.log(req.body);
    const { token, lettuce, bacon, cheese, meat } = req.body;

    if (token) {
      const user = await User.verifyJWTAuthToken(token.data);
      //  console.log (user);
      const userId = user._id;
      // Check if User Id in Menu Already Update
      const userIdExistCheck = await Menu.findOne({ userId }).exec();
      if (userIdExistCheck) {
        
        console.log("User Id Already Exits in save menu...");

        await Menu.updateMenu(userId , lettuce, bacon, cheese, meat);
        console.log("Menu Update");
        res.status(200).send("The data is save");
      } else {
        // Save The Menu for New User....
        await Menu.saveNewMenu(userId, lettuce, bacon, cheese, meat);
        res.status(200).send("The data is save");
      }
    } else {
      res.status(400).send({ message: "There is error to save Into menu" });
    }
  } catch (err) {
    res.status(400).send({ message: "There is error to save Into menu" });
    console.error("Error in SaveIntoMenu ->", err);
  }
};

module.exports = MenuSave;
