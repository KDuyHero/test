const express = require("express");
const router = express.Router();
const { addToCart, removeFromCart } = require("../controller/cartController");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/add", verifyToken, addToCart);
router.post("/remove", verifyToken, removeFromCart);
module.exports = router;
