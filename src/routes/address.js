const express = require('express');
const router = express.Router();
const { auth, userMiddleware } = require('../middleware/userMiddleware');
const { addAddress, getAddress } = require('../controller/address');

router.post('/create', auth, userMiddleware, addAddress);
router.post('/getaddress', auth, userMiddleware, getAddress);

module.exports = router;