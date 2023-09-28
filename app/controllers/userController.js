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

userController.search = (req, res) => {
    const searchTerm = req.query.search; // Assuming you are sending the search term as a query parameter
    UserDetailsModel.searchUsersByName(searchTerm, (err, result) => {
      if (err) {
        console.error("Error searching for user names: ", err);
        return res.status(500).json({ message: "Error searching for user names." });
      }
  
      return res.status(200).json({ message: "Matching user names retrieved successfully.", userNames: result });
    });
  };

  userController.deleteUser = (req, res) => {
    const userIdToDelete = req.query.id;
  
    UserDetailsModel.deleteUserById(userIdToDelete, (err) => {
      if (err) {
        console.error("Error deleting user and related records: ", err);
        return res.status(500).json({ message: "Error deleting user and related records." });
      }
  
      return res.status(200).json({ message: "User and related records deleted successfully." });
    });
  };

module.exports = userController;
