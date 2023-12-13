const dbConn = require('../config/db.config');

const Emergency = {};

Emergency.insertEmergency = (userId, name, longitude, latitude, result) => {
  dbConn.query(
    'INSERT INTO emergency (user_id, name, longitude, latitude) VALUES (?, ?, ?, ?)',
    [userId, name, longitude, latitude],
    (err, res) => {
      if (err) {
        console.error('Error inserting emergency data: ', err);
        result(err, null);
        return;
      }
      console.log('Emergency data inserted successfully');
      result(null, res);
    }
  );
};

Emergency.getAllEmergency = (result) => {
  dbConn.query('SELECT * FROM emergency', (err, res) => {
    if (err) {
      console.error('Error retrieving emergency data: ', err);
      result(err, null);
      return;
    }
    console.log('Emergency data retrieved successfully');
    result(null, res);
  });
};

Emergency.getUserDetails = (userId, result) => {
  dbConn.query(
    'SELECT name FROM user_details WHERE user_id = ?',
    [userId],
    (err, res) => {
      if (err) {
        console.error('Error retrieving user details: ', err);
        result(err, null);
        return;
      }

      if (res.length === 0) {
        result(null, null); // User not found
        return;
      }

      const userDetails = res[0];
      result(null, userDetails);
    }
  );
};

module.exports = Emergency;
