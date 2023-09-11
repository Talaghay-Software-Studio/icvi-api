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

module.exports = HistoryLocation;
