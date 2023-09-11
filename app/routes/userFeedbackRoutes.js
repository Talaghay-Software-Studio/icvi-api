const express = require('express');
const router = express.Router();
const userFeedbackController = require('../controllers/userFeedbackController');

// Routes
router.post("/", userFeedbackController.createFeedback);

module.exports = router;