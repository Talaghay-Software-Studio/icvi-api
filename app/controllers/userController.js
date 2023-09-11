// controllers/userController.js
const UserDetailsModel = require('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res) => {
  UserDetailsModel.getAllUserNames((err, result) => {
    if (err) {
      console.error("Error retrieving user names: ", err);
      return res.status(500).json({ message: "Error retrieving user names." });
    }

    return res.status(200).json({ message: "User names retrieved successfully.", userNames: result });
  });
};

module.exports = userController;
