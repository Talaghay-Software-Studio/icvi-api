const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

// Routes
router.post("/", questionsController.createQuestions);
router.put("/update", questionsController.updateQuestions);
router.get("/getall", questionsController.getAllQuestions);
router.delete("/delete", questionsController.deleteQuestions);

module.exports = router;