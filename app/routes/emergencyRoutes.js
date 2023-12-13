const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// Routes
router.post("/", emergencyController.postEmergency);
router.get("/get", emergencyController.getEmergency);

module.exports = router;