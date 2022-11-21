const express = require("express");
const router = express.Router();
const getHome = require("../controller/Home");
const HomeAuthication = require("../middleware/HomeAunthication");
const Register = require("../controller/user/Register");
const Login = require("../controller/user/Login");
const Logout = require("../controller/user/Logout");
const MenuSave = require ('../controller/menu/MenuSave');
const GetMenuById = require ('../controller/menu/GetMenuById');
// Home Router

router.get("/", getHome);

// Register Route

router.post("/register", Register);

// Login Route

router.post("/login", Login);

// Home Verification Route of User

router.post("/home", HomeAuthication);

// Logout User

router.post("/logout", Logout);

// Save Menu Route

router.post ('/savemenu' , MenuSave);


// Get Menu by ID

router.post ('/getMenuById' , GetMenuById);


module.exports = router;
