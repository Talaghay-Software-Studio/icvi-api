// models/userDetailsModel.js
const dbConn = require('../config/db.config');

const UserDetails = {};

UserDetails.getAllUserNames = (result) => {
  dbConn.query("SELECT ud.user_id AS id, ud.name, u.email_add, ud.phone_number FROM user_details ud JOIN user u ON ud.user_id = u.id", (err, res) => {
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

  UserDetails.deleteUserById = (userId, callback) => {
    // Begin a transaction to ensure consistency when deleting from multiple tables
    dbConn.beginTransaction((err) => {
      if (err) {
        console.error("Error starting a transaction: ", err);
        return callback(err);
      }
  
      // Delete from user_details table
      const deleteUserDetailsQuery = 'DELETE FROM user_details WHERE id = ?';
      dbConn.query(deleteUserDetailsQuery, [userId], (err) => {
        if (err) {
          dbConn.rollback(() => {
            console.error("Error deleting from user_details table: ", err);
            return callback(err);
          });
        }
  
        // Delete from feedback_table
        const deleteFeedbackQuery = 'DELETE FROM feedback_table WHERE user_id = ?';
        dbConn.query(deleteFeedbackQuery, [userId], (err) => {
          if (err) {
            dbConn.rollback(() => {
              console.error("Error deleting from feedback_table: ", err);
              return callback(err);
            });
          }
  
          // Delete from location_history table
          const deleteLocationHistoryQuery = 'DELETE FROM location_history WHERE user_id = ?';
          dbConn.query(deleteLocationHistoryQuery, [userId], (err) => {
            if (err) {
              dbConn.rollback(() => {
                console.error("Error deleting from location_history table: ", err);
                return callback(err);
              });
            }
  
            // Commit the transaction if all deletions were successful
            dbConn.commit((err) => {
              if (err) {
                dbConn.rollback(() => {
                  console.error("Error committing the transaction: ", err);
                  return callback(err);
                });
              }
  
              // Transaction completed successfully
              console.log("User and related records deleted successfully.");
              callback(null);
            });
          });
        });
      });
    });
  };
  

module.exports = UserDetails;
