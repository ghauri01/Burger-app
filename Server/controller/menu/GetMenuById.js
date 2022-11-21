const User = require ('../../models/user');
const Menu = require ('../../models/menu');

// Get Menu Items of User by ID
const GetMenuById = async (req , res) => {
    try {
        const token = req.body.data;
        if (token) {
            const verifyToken = await User.verifyJWTAuthToken (token);
            const userId = verifyToken._id;
             const data = await  Menu.findOne ({userId}).exec();

            if (!data) {
                res.status (400).send({message:'The Data is not save'});
            } else {
                res.status (200).json (data);
            }
             
        } else {
            res.status (400).send ({message:"The is some problem while loading"});
        }
    } catch (err) {
        res.status (400).send ({message:"The is some problem while loading"});
        console.log ('Error in Get Menu By ID ->' , err);
    }
}


module.exports = GetMenuById;