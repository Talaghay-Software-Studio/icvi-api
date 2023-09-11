const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Routes
router.get("/getanalytics", analyticsController.getAnalytics);
router.get("/useranalytics", analyticsController.getAnalytics2);

module.exports = router;