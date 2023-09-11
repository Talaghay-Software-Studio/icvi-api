const express = require('express');
const router = express.Router();
const userLoginController = require('../controllers/userLoginController');

// Routes
router.post("/", userLoginController.checkEmail);
router.post("/logout", userLoginController.logout);

module.exports = router;