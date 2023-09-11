const express = require('express');
const router = express.Router();
const historyLocation = require('../controllers/historyController');

// Routes
router.post("/", historyLocation.postHistoryLocation);
router.get("/showall", historyLocation.getAllData);
router.get("/showanalytics", historyLocation.getAnalytics);


module.exports = router;