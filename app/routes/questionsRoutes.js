const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

// Routes
router.post("/", questionsController.createQuestions);


module.exports = router;