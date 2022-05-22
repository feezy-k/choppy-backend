const express = require('express');
const router = express.Router();
const {signin} = require('../controller/user/signin');
const { auth } = require('../middleware/userMiddleware');
const { signup } = require('../controller/user/signup');

router.post('/signup',signup);
router.post('/signin',signin);


router.get('/profile', auth, (req,res) => {
    res.send({user: 'My Profile'});
});

module.exports = router;

