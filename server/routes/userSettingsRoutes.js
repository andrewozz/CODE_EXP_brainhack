const express = require("express");
const {
    createUserAccount,
    authenticateUserAccount
} = require("../controllers/userAccountController");
let router = express.Router();

// ALL APIS FOR USER ACCOUNT SETTINGS 

// 1. Create User
router.post("/create-user-account", createUserAccount)

// 2. Authentication - log in
router.get("/login-user",authenticateUserAccount)



module.exports = router;
