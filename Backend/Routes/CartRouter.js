const { getCart, PostCart, increase, decrease, DeleteCart } = require("../controller/Usercontroller");
const express = require("express");
const router = express.Router();

router.get("/", getCart);
router.post("/", PostCart);
router.put("/increase/:id", increase);   // ✅ separate routes
router.put("/decrease/:id", decrease);   // ✅ for each action
router.delete("/:id", DeleteCart);

module.exports = router;