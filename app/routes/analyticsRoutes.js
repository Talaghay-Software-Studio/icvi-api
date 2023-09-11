const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Routes
router.get("/getanalytics", analyticsController.getAnalytics);

module.exports = router;