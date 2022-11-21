const bcyrpt = require("bcrypt");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcyrpt.genSalt(12, (error, salt) => {
      if (error) {
        reject(error);
      } else {
        bcyrpt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
};


const comparePassword = (password , hashedPassword) => {
    return bcyrpt.compare (password , hashedPassword);
};

module.exports = {hashPassword , comparePassword};
