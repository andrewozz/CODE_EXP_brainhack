const express = require("express");
const { authenticateStoreEntry, getAllStoreItems, updateStoreItemQuantity} = require("../controllers/InventoryController.js");
let router = express.Router();


// 1. authenticate store entry
router.post("/authenticate-store-entry", authenticateStoreEntry)

// 2. get all store items for a particular store in a camp
router.get("/get-all-store-items", getAllStoreItems);

//3. update quanitity of store item
router.post("/update-quantity-store-item",updateStoreItemQuantity)



module.exports = router;
