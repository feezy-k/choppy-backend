const express = require('express');
const { addItemToCart, getCartItems, removeCartItems } = require('../controller/cart');
const { auth, userMiddleware } = require('../middleware/userMiddleware');
const router = express.Router();


router.post('/addtocart', [auth,userMiddleware], addItemToCart);
router.post("/getCartItems", [auth, userMiddleware], getCartItems);
router.post("/removeItem",[auth, userMiddleware], removeCartItems);
  
module.exports = router;
