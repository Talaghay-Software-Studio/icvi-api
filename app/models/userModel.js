// models/userDetailsModel.js
const dbConn = require('../config/db.config');

const UserDetails = {};

UserDetails.getAllUserNames = (result) => {
  dbConn.query("SELECT name FROM user_details", (err, res) => {
    if (err) {
      console.error("Error retrieving user names: ", err);
      result(err, null);
      return;
    }
    console.log("Retrieved all user names");
    result(null, res);
  });
};

module.exports = UserDetails;
