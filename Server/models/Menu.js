const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Menu Schema
const MenuSchema = new Schema({
  userID: {
    type: String,
    require: true,
  },
  lettuceCount: {
    type: Number,
    require: true,
  },
  baconCount: {
    type: Number,
    require: true,
  },
  cheeseCount: {
    type: Number,
    require: true,
  },
  meatCount: {
    type: Number,
    require: true,
  },
});

// Save New Menu

MenuSchema.statics.saveNewMenu = async function (
  userId,
  lettuceCount,
  baconCount,
  cheeseCount,
  meatCount
) {
  const menu = new this({
    userID: userId,
    lettuceCount: lettuceCount,
    baconCount: baconCount,
    cheeseCount: cheeseCount,
    meatCount: meatCount,
  });
  await menu.save();
  console.log("Menu Save");
};

// Get All Menu

MenuSchema.statics.getMenu = async function (userId) {
  const menu = this;
  await this.findOne({ userId }).exec();
  return menu;
};

// Update All Menu
MenuSchema.statics.updateMenu = async function (
  userId,
  lettuceCount,
  baconCount,
  cheeseCount,
  meatCount
) {
  const menu = await this.update(
    { userID: userId },
    {
      lettuceCount: lettuceCount,
      baconCount: baconCount,
      cheeseCount: cheeseCount,
      meatCount: meatCount,
    }
  );
  console.log("Menu Update");
};
module.exports = mongoose.model("Menu", MenuSchema);
