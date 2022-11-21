const mongoees = require ('mongoose');
require("dotenv").config();

// Connection to the DB

const DbConnection = mongoees.connect (process.env.MongoDB).then(() => {
    console.log ('DB connecting sucessfully.......');
}).catch ((error) => {
    console.log ('error ->' , error);
});

module.exports = {DbConnection};
