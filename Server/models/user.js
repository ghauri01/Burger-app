const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    max: 20,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    max: 20,
  },
  password: {
    type: String,
    require: true,
    max: 20,
  },
  token: {
    type: String,
    require: true,
  },
});

// Create JWT Token
userSchema.statics.createJWTAuthToken = async function (userObj) {
  const user = this;
  const token = jwt.sign({ _id: userObj._id }, process.env.JWTTOKEN, {
    expiresIn: "7d",
  });
  await user.updateOne({ _id: userObj._id }, { token: token } );
  return token;
};

// Verify JWT TOKEN
userSchema.statics.verifyJWTAuthToken = async function (token) {
  const verify = await jwt.verify (token , process.env.JWTTOKEN);
  return verify;
}

// Delete JWT TOKEN
userSchema.statics.deleteJWTAuthToken = async function (id) {
  const user = this;
  const rootUser = await user.updateOne ({_id:id} , {token : ''});
  return rootUser;
}

module.exports = mongoose.model("User", userSchema);
