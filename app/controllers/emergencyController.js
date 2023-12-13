const EmergencyModel = require('../models/emergencyModel');

const emergencyController = {};

emergencyController.postEmergency = (req, res) => {
  const { user_id, longitude, latitude } = req.body;

  if (!user_id || !longitude || !latitude) {
    return res.status(400).json({ message: 'User ID, longitude, and latitude are required.' });
  }

  // Retrieve user details based on user_id
  EmergencyModel.getUserDetails(user_id, (err, userDetails) => {
    if (err) {
      console.error('Error retrieving user details: ', err);
      return res.status(500).json({ message: 'Error retrieving user details.' });
    }

    if (!userDetails) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { name } = userDetails;

    // Insert emergency data into the database
    EmergencyModel.insertEmergency(user_id, name, longitude, latitude, (err, result) => {
      if (err) {
        console.error('Error inserting emergency data: ', err);
        return res.status(500).json({ message: 'Error inserting emergency data.' });
      }

      return res.status(201).json({ message: 'Emergency Sent' });
    });
  });
};

emergencyController.getEmergency = (req, res) => {
  // Retrieve all data from emergency table
  EmergencyModel.getAllEmergency((err, data) => {
    if (err) {
      console.error('Error retrieving emergency data: ', err);
      return res.status(500).json({ message: 'Error retrieving emergency data.' });
    }

    return res.status(200).json({ message: 'Emergency Retrieved', data });
  });
};

module.exports = emergencyController;