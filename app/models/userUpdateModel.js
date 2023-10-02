// models/userUpdateModel.js
const dbConn = require("../config/db.config");

const UpdatedUser = {};

UpdatedUser.update = (userId, updatedUser, gender, impairmentCategory, callback) => {
  // Check if the user with the provided userId exists in the user_details table
  dbConn.query(
    "SELECT * FROM user_details WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.error("Error checking user details existence: ", error);
        return callback(error, null);
      } else {
        // Check if the user details exist
        const userDetailsExist = result.length > 0;

        // If the user details don't exist, insert a new row in the 'user_details' table
        if (!userDetailsExist) {
          dbConn.query(
            "INSERT INTO user_details (user_id, phone_number, name, gender, impairment_category, age, address) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            [userId, updatedUser.phone_number, updatedUser.name, gender, impairmentCategory, updatedUser.age, updatedUser.address],
            (error, result) => {
              if (error) {
                console.error("Error inserting new user details: ", error);
                return callback(error, null);
              } else {
                // Update the 'user' table's 'username' column
                dbConn.query(
                  "UPDATE user SET username = ? WHERE id = ?",
                  [updatedUser.username, userId],
                  (error, result) => {
                    if (error) {
                      console.error("Error updating username in the user table: ", error);
                      return callback(error, null);
                    } else {
                      return callback(null, result);
                    }
                  }
                );
              }
            }
          );
        } else {
          // Proceed with updating the user details in the 'user_details' table
          dbConn.query(
            "UPDATE user_details SET phone_number = ?, name = ?, gender = ?, impairment_category = ?, age = ?, address = ? WHERE user_id = ?",
            [updatedUser.phone_number, updatedUser.name, gender, impairmentCategory, updatedUser.age, updatedUser.address, userId],
            (error, result) => {
              if (error) {
                console.error("Error updating user details in database: ", error);
                return callback(error, null);
              } else {
                // Update the 'user' table's 'username' column
                dbConn.query(
                  "UPDATE user SET username = ? WHERE id = ?",
                  [updatedUser.username, userId],
                  (error, result) => {
                    if (error) {
                      console.error("Error updating username in the user table: ", error);
                      return callback(error, null);
                    } else {
                      return callback(null, result);
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};




UpdatedUser.updateWithoutGenderAndImpairment = (userId, updatedUser, callback) => {
  // Check if the user with the provided userId exists
  dbConn.query(
    "SELECT * FROM user WHERE id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.error("Error checking user existence: ", error);
        return callback(error, null);
      } else if (result.length === 0) {
        // User with the provided userId doesn't exist
        return callback("User ID doesn't exist", null);
      } else {
        // Proceed with updating the user details (excluding gender and impairment_category)
        dbConn.query(
          "UPDATE user SET username = ? WHERE id = ?",
          [updatedUser.username, userId],
          (error, result) => {
            if (error) {
              console.error("Error updating user in database: ", error);
              return callback(error, null);
            } else {
              // Update user details in the 'user_details' table (excluding gender and impairment_category)
              dbConn.query(
                "UPDATE user_details SET phone_number = ?, name = ? WHERE user_id = ?",
                [updatedUser.phone_number, updatedUser.name, userId],
                (error, result) => {
                  if (error) {
                    console.error("Error updating user details in database: ", error);
                    return callback(error, null);
                  } else {
                    return callback(null, result);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

module.exports = UpdatedUser;
