const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get("/getall", userController.getAllUsers);

module.exports = router;