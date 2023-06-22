const dbConn = require("../config/db.config");

const UserModel = {};

UserModel.getByEmailOrUsername = (emailOrUsername, callback) => {
  dbConn.query(
    "SELECT * FROM user WHERE email_add = ? OR username = ?",
    [emailOrUsername, emailOrUsername],
    (error, result) => {
      if (error) {
        console.error("Error retrieving user by email or username: ", error);
        return callback(error, null);
      }

      if (result.length > 0) {
        return callback(null, result[0]);
      } else {
        console.log("User not found by email, trying username...");

        // If no results found by email, try again by username
        dbConn.query(
          "SELECT * FROM user WHERE username = ?",
          [emailOrUsername],
          (error, result) => {
            if (error) {
              console.error("Error retrieving user by username: ", error);
              return callback(error, null);
            }

            if (result.length > 0) {
              return callback(null, result[0]);
            } else {
              return callback(null, null);
            }
          }
        );
      }
    }
  );
};

UserModel.getUserDetails = (userId, callback) => {
  dbConn.query(
    "SELECT * FROM user_details WHERE user_id = ?",
    [userId],
    (error, result) => {
      if (error) {
        console.error("Error retrieving user details: ", error);
        return callback(error, null);
      }

      return callback(null, result);
    }
  );
};

module.exports = UserModel;
