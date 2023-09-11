const HistoryLocationModel = require('../models/historyModel');

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

module.exports = historyController;
