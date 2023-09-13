const dbConn = require('../config/db.config');

const HistoryLocation = {};

HistoryLocation.insertLocation = (userId, address, result) => {
  dbConn.query(
    'INSERT INTO location_history (user_id, address) VALUES (?, ?)',
    [userId, address],
    (err, res) => {
      if (err) {
        console.error('Error inserting location data: ', err);
        result(err, null);
        return;
      }
      console.log('Location data inserted successfully');
      result(null, res);
    }
  );
};

HistoryLocation.getAllData = (result) => {
    dbConn.query('SELECT * FROM location_history', (err, res) => {
      if (err) {
        console.error('Error retrieving location history data: ', err);
        result(err, null);
        return;
      }
  
      console.log('Retrieved all location history data');
      result(null, res);
    });
  };

HistoryLocation.getPercentageByUser = (result) => {
    const query = `
      SELECT user_id, address, COUNT(*) AS count,
      (SELECT COUNT(*) FROM location_history AS lh2 WHERE lh2.user_id = location_history.user_id) AS totalCount
      FROM location_history
      GROUP BY user_id, address
    `;
    dbConn.query(query, (err, res) => {
      if (err) {
        console.error('Error retrieving location percentage by user: ', err);
        result(err, null);
        return;
      }
      console.log('Retrieved location percentage by user');
      const dataByUser = {};
  
      // Calculate the percentages
      for (const item of res) {
        const userId = item.user_id;
        const address = item.address;
        const count = item.count;
        const totalCount = item.totalCount;
        const percentage = ((count / totalCount) * 100).toFixed(1);
  
        if (!dataByUser[userId]) {
          dataByUser[userId] = {
            type: `User ${userId}`,
            data: [],
          };
        }
  
        dataByUser[userId].data.push({
          name: address || 'Unknown', // Address or "Unknown" if empty
          value: `${percentage}%`,
        });
      }
  
      result(null, Object.values(dataByUser));
    });
  };

  HistoryLocation.insertLocation = (user_id, longitude, latitude, session_hash, address, result) => {

    // if (longitude < -180 || longitude > 180) {
    //   const errorMessage = 'Invalid longitude value. Longitude must be within the range -180 to 180 degrees.';
    //   console.error(errorMessage);
    //   return result(errorMessage, null);
    // }

    dbConn.query(
      'INSERT INTO location_history (user_id, longitude, latitude, session_hash, address) VALUES (?, ?, ?, ?, ?)',
      [user_id, longitude, latitude, session_hash, address],
      (err, res) => {
        if (err) {
          console.error('Error inserting location data: ', err);
          result(err, null);
          return;
        }
        console.log('Location data inserted successfully');
        result(null, res);
      }
    );
  }

  HistoryLocation.getByUserIdLocation = (userId, result) => {
    dbConn.query(
      'SELECT session_hash, MIN(created_at) as first_created_at, MAX(created_at) as last_created_at FROM location_history WHERE user_id = ? GROUP BY session_hash ORDER BY session_hash',
      [userId],
      (err, rows) => {
        if (err) {
          console.error('Error retrieving location history data: ', err);
          result(err, null);
          return;
        }
  
        const data = [];
  
        rows.forEach((row) => {
          const sessionHash = row.session_hash;
          const firstCreatedAt = row.first_created_at;
          const lastCreatedAt = row.last_created_at;
  
          // Retrieve point_a and point_b for the first and last created_at
          dbConn.query(
            'SELECT address as point_a_address, latitude as point_a_latitude, longitude as point_a_longitude FROM location_history WHERE user_id = ? AND session_hash = ? AND created_at = ?',
            [userId, sessionHash, firstCreatedAt],
            (err, firstRow) => {
              if (err) {
                console.error('Error retrieving point_a data: ', err);
                result(err, null);
                return;
              }
  
              dbConn.query(
                'SELECT address as point_b_address, latitude as point_b_latitude, longitude as point_b_longitude FROM location_history WHERE user_id = ? AND session_hash = ? AND created_at = ?',
                [userId, sessionHash, lastCreatedAt],
                (err, lastRow) => {
                  if (err) {
                    console.error('Error retrieving point_b data: ', err);
                    result(err, null);
                    return;
                  }
  
                  // Construct the data entry
                  const entry = {
                    session_hash: sessionHash,
                    first_created_at: firstCreatedAt,
                    last_created_at: lastCreatedAt,
                    point_a: {
                      address: firstRow[0].point_a_address, // Include address for point_a
                      latitude: firstRow[0].point_a_latitude,
                      longitude: firstRow[0].point_a_longitude,
                    },
                    point_b: {
                      address: lastRow[0].point_b_address, // Include address for point_b
                      latitude: lastRow[0].point_b_latitude,
                      longitude: lastRow[0].point_b_longitude,
                    },
                  };
  
                  data.push(entry);
  
                  // Check if all entries have been processed
                  if (data.length === rows.length) {
                    console.log('Retrieved location history data for user', userId);
                    result(null, data);
                  }
                }
              );
            }
          );
        });
      }
    );
  };
  

  HistoryLocation.getAllSummaryByLocation = (result) => {
    dbConn.query(
      'SELECT user_id, session_hash, MIN(created_at) as first_created_at, MAX(created_at) as last_created_at FROM location_history GROUP BY user_id, session_hash ORDER BY user_id, session_hash',
      (err, rows) => {
        if (err) {
          console.error('Error retrieving location history data: ', err);
          result(err, null);
          return;
        }
  
        const data = [];
  
        rows.forEach((row) => {
          const userId = row.user_id;
          const sessionHash = row.session_hash;
          const firstCreatedAt = row.first_created_at;
          const lastCreatedAt = row.last_created_at;
  
          // Retrieve point_a and point_b for the first and last created_at
          dbConn.query(
            'SELECT address as point_a_address, latitude as point_a_latitude, longitude as point_a_longitude FROM location_history WHERE user_id = ? AND session_hash = ? AND created_at = ?',
            [userId, sessionHash, firstCreatedAt],
            (err, firstRow) => {
              if (err) {
                console.error('Error retrieving point_a data: ', err);
                result(err, null);
                return;
              }
  
              dbConn.query(
                'SELECT address as point_b_address, latitude as point_b_latitude, longitude as point_b_longitude FROM location_history WHERE user_id = ? AND session_hash = ? AND created_at = ?',
                [userId, sessionHash, lastCreatedAt],
                (err, lastRow) => {
                  if (err) {
                    console.error('Error retrieving point_b data: ', err);
                    result(err, null);
                    return;
                  }
  
                  // Construct the data entry
                  const entry = {
                    user_id: userId,
                    session_hash: sessionHash,
                    first_created_at: firstCreatedAt,
                    last_created_at: lastCreatedAt,
                    point_a: {
                      address: firstRow[0].point_a_address, // Include address for point_a
                      latitude: firstRow[0].point_a_latitude,
                      longitude: firstRow[0].point_a_longitude,
                    },
                    point_b: {
                      address: lastRow[0].point_b_address, // Include address for point_b
                      latitude: lastRow[0].point_b_latitude,
                      longitude: lastRow[0].point_b_longitude,
                    },
                  };
  
                  data.push(entry);
  
                  // Check if all entries have been processed
                  if (data.length === rows.length) {
                    console.log('Retrieved location history data for all users');
                    result(null, data);
                  }
                }
              );
            }
          );
        });
      }
    );
  };
  
  

module.exports = HistoryLocation;
