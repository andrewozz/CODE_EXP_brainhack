// Establish connection to database in firebase

const firebase = require("firebase/app");
const config = require("./config/config");
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
module.exports = { db };
