const UserModel = require('../models/userLoginModel');
const bcrypt = require('bcrypt');

const userLoginController = {};

userLoginController.checkEmail = (req, res) => {
  const { email_or_username, password } = req.body;

  UserModel.getByEmailOrUsername(email_or_username, (error, user) => {
    if (error) {
      console.error("Error checking email or username: ", error);
      return res.status(500).send("Error checking email or username");
    }

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords: ", err);
        return res.status(500).send("Error comparing passwords");
      }

      if (!isMatch) {
        return res.status(401).send("Invalid password");
      }

      // Password is correct, retrieve user details
      UserModel.getUserDetails(user.id, (error, userDetails) => {
        if (error) {
          console.error("Error retrieving user details: ", error);
          return res.status(500).send("Error retrieving user details");
        }

        // Construct the response object with the desired fields
        const response = {
          message: "Login successful",
          userDetails: [
            {
              id: user.id,
              user_id: user.user_id,
              email_add: user.email_add,
              username: user.username,
              category: user.category,
              name: user.name,
              phone_number: user.phone_number,
              modified_at: user.modified_at,
              created_at: user.created_at,
            },
          ],
        };

        // Return the response
        res.status(200).json(response);
      });
    });
  });
};

module.exports = userLoginController;
