const Menu = require("../../models/menu");
const User = require("../../models/user");

// Save data to menu controller

const MenuSave = async (req, res) => {
  try {
    const { token, lettuce, bacon, cheese, meat } = req.body;

    if (token) {
      const user = await User.verifyJWTAuthToken(token.data);
      // Check if User Id in Menu Already Update
      const userIdExistCheck = await Menu.findOne({ userID:user._id }).exec();
      if (userIdExistCheck) {
        console.log("User Id Already Exits in save menu...");
        // Await for Menu Update
        await Menu.updateMany(
          { userID: user._id },
          {
            lettuceCount: lettuce,
            baconCount: bacon,
            cheeseCount: cheese,
            meatCount: meat,
          }
        );
        // Send Response 200
        res.status(200).send("The data is save");
      } else {
        console.log("user Not exits");
        // Save The Menu for New User....
        //await Menu.saveNewMenu(userId, lettuce, bacon, cheese, meat);
        const menu = new Menu({
          userID: user._id,
          lettuceCount: lettuce,
          baconCount: bacon,
          cheeseCount: cheese,
          meatCount: meat,
        });
        await menu.save();
        res.status(200).send("The data is save");
      }

       //Save The Menu for New User....
        await Menu.saveNewMenu(user._id, lettuce, bacon, cheese, meat);
        

    } else {
      res.status(400).send({ message: "There is error to save Into menu" });
    }
  } catch (err) {
    res.status(400).send({ message: "There is error to save Into menu" });
    console.error("Error in SaveIntoMenu ->", err);
  }
};

module.exports = MenuSave;
