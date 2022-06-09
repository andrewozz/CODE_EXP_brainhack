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



// router.get("/get-listed-flats", getAllFlatsListed);
// router.get("/get-user-listed-flats", getOnlyUserListedFlats);
// router.post("/post-new-flat", postNewFlat);
// router.put("/update-listed-flat", updateListedFlats);
// router.delete("/delete-listed-flat", deleteFlatListing);
// router.get("/get-bookmarked-flats", getBookMarkedFlats);
// router.post("/send-email-to-seller",sendEmailToSeller);

module.exports = router;
