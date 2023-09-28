// models/userDetailsModel.js
const dbConn = require('../config/db.config');

const UserDetails = {};

UserDetails.getAllUserNames = (result) => {
  dbConn.query("SELECT ud.user_id, ud.name, u.email_add, ud.phone_number FROM user_details ud JOIN user u ON ud.user_id = u.id", (err, res) => {
    if (err) {
      console.error("Error retrieving user names: ", err);
      result(err, null);
      return;
    }
    console.log("Retrieved all user names with email addresses");
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
