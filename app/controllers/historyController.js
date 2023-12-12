const HistoryLocationModel = require('../models/historyModel');
const crypto = require('crypto');

const historyController = {};

historyController.postHistoryLocation = (req, res) => {
  const { user_id, address } = req.body;

  if (!user_id || !address) {
    return res.status(400).json({ message: 'User ID and address are required.' });
  }

  HistoryLocationModel.insertLocation(user_id, address, (err, result) => {
    if (err) {
      console.error('Error inserting location data: ', err);
      return res.status(500).json({ message: 'Error inserting location data.' });
    }

    return res.status(201).json({ message: 'Location data inserted successfully.', data: result });
  });
};

historyController.getAllData = (req, res) => {
    HistoryLocationModel.getAllData((err, result) => {
      if (err) {
        console.error('Error retrieving location history data: ', err);
        return res.status(500).json({ message: 'Error retrieving location history data.' });
      }
  
      return res.status(200).json({ message: 'Location history data retrieved successfully.', data: result });
    });
  };

  historyController.getAnalytics = (req, res) => {
    HistoryLocationModel.getPercentageByUser((err, result) => {
      if (err) {
        console.error('Error retrieving location percentage by user: ', err);
        return res.status(500).json({ message: 'Error retrieving location percentage by user.' });
      }
  
      return res.status(200).json({ data: result });
    });
  };


// Function to generate a session hash with a time-based component
function generateSessionHash(scopeInMinutes) {
  const currentTimestamp = Math.floor(Date.now() / (scopeInMinutes * 60 * 1000)); // Calculate current time in minutes
  const dataToHash = `${currentTimestamp}`;
  return crypto.createHash('sha256').update(dataToHash).digest('hex');
}

historyController.postCurrentLocation = (req, res) => {
  const { user_id, longitude, latitude, scope } = req.body;
  let { address } = req.body;

  if (!user_id || !longitude || !latitude || !scope) {
    return res.status(400).json({ message: 'User ID, longitude, latitude, and scope are required.' });
  }

  // Set a default value for address if it's empty or not provided
  if (!address || address.trim() === '') {
    address = 'Unnamed Location';
  }
  const session_hash = generateSessionHash(scope); // Generate a session hash with the specified scope

  HistoryLocationModel.insertLocation(user_id, longitude, latitude, session_hash, address, (err, result) => {
    if (err) {
      console.error('Error inserting location data: ', err);
      return res.status(500).json({ message: 'Error inserting location data.' });
    }

    return res.status(201).json({ message: 'Location data inserted successfully.', data: result });
  });
};

// historyController.getByUserIdLocation = (req, res) => {
//   // Get the userId from the request or wherever it is available
//   const userId = req.body.user_id; // Assuming userId is in the URL params

//   HistoryLocationModel.getByUserIdLocation(userId, (err, result) => {
//     if (err) {
//       console.error('Error retrieving location history data: ', err);
//       return res.status(500).json({ message: 'Error retrieving location history data.' });
//     }

//     return res.status(200).json({ message: 'Location history data retrieved successfully for user ID: ' + userId, data: result });
//   });
// };

const geolib = require('geolib'); // Install the geolib library using: npm install geolib

historyController.getByUserIdLocation = (req, res) => {
  const userId = req.body.user_id;

  HistoryLocationModel.getByUserIdLocation(userId, (err, result) => {
    if (err) {
      console.error('Error retrieving location history data: ', err);
      return res.status(500).json({ message: 'Error retrieving location history data.' });
    }

    // Calculate distance traveled for each session in the result
    const resultWithDistance = result.map(session => {
      const distance = geolib.getDistance(
        { latitude: session.point_a.latitude, longitude: session.point_a.longitude },
        { latitude: session.point_b.latitude, longitude: session.point_b.longitude }
      );

      // Convert distance from meters to kilometers
      const distanceInKm = distance / 1000;

      // Add the distance_traveled property to the session
      return {
        ...session,
        distance_traveled: distanceInKm,
      };
    });

    return res.status(200).json({ message: 'Location history data retrieved successfully for user ID: ' + userId, data: resultWithDistance });
  });
};

historyController.getAllSummaryByLocation = (req, res) => {
  HistoryLocationModel.getAllSummaryByLocation((err, result) => {
    if (err) {
      console.error('Error retrieving location history data: ', err);
      return res.status(500).json({ message: 'Error retrieving location history data.' });
    }

    return res.status(200).json({ message: 'Location history data retrieved successfully.', data: result });
  });
};

module.exports = historyController;
