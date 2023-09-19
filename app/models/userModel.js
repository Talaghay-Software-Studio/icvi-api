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

UserDetails.searchUsersByName = (searchTerm, result) => {
    const query = "SELECT name FROM user_details WHERE name LIKE ?";
    const searchValue = `%${searchTerm}%`; // Add '%' around the search term to perform a partial match
  
    dbConn.query(query, [searchValue], (err, res) => {
      if (err) {
        console.error("Error searching for user names: ", err);
        result(err, null);
        return;
      }
      console.log("Retrieved matching user names");
      result(null, res);
    });
  };

module.exports = UserDetails;
