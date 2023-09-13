const express = require('express');
const router = express.Router();
const historyLocation = require('../controllers/historyController');

// Routes for showing 
router.post("/", historyLocation.postHistoryLocation);
router.get("/showall", historyLocation.getAllData);
router.get("/showanalytics", historyLocation.getAnalytics);

// Realtime Location
router.post("/realtime", historyLocation.postCurrentLocation);
router.get("/getbyuser", historyLocation.getByUserIdLocation);
router.get("/summary", historyLocation.getAllSummaryByLocation);


module.exports = router;