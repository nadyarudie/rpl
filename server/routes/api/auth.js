// server/routes/api/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// Endpoint Register
router.post('/register', authController.register);

// Endpoint Login
router.post('/login', authController.login);

module.exports = router;
