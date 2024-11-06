const express = require("express");
const router = express.Router();
const { 
    registerUser, 
    loginUser 
} = require("../controllers/userController");


// Route to register a new user
router.post("/register", registerUser);

module.exports = router;