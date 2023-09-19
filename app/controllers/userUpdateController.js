const UserModel = require("../models/userUpdateModel");

exports.updateUser = function (req, res) {
  const updatedUser = {
    username: req.body.username,
    name: req.body.name,
    phone_number: req.body.phone_number,
    age: req.body.age === 0 ? null : req.body.age, // Set age to null if it's 0
    address: req.body.address.trim() || null, // Trim and set address to null if empty or whitespace
  };
  const userId = req.body.userId;
  const gender = req.body.gender.trim(); // Trim to remove whitespace
  const impairmentCategory = req.body.impairment_category.trim(); // Trim to remove whitespace

  // Check if gender and impairmentCategory are not empty or whitespace
  if (gender !== "" && impairmentCategory !== "") {
    // Both gender and impairment_category have values, so update them
    UserModel.update(userId, updatedUser, gender, impairmentCategory, (error, result) => {
      if (error) {
        console.error("Error updating user: ", error);
        return res.status(500).json({
          error: 'Internal Server Error, id does not exist or username already exists',
          message: 'Error updating user'
        });
      } else {
        console.log("User updated successfully");

        res.status(200).json({
          message: "User updated successfully",
          data: result
        });
      }
    });
  } else {
    // Either gender or impairment_category is empty or whitespace, do not update them
    UserModel.updateWithoutGenderAndImpairment(userId, updatedUser, (error, result) => {
      if (error) {
        console.error("Error updating user without gender and impairment: ", error);
        return res.status(500).json({
          error: 'Internal Server Error, id does not exist or username already exists',
          message: 'Error updating user'
        });
      } else {
        console.log("User updated without gender and impairment successfully");

        res.status(200).json({
          message: "User updated without gender and impairment successfully",
          data: result
        });
      }
    });
  }
};
