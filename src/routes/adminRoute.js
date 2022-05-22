const express = require('express');
const router = express.Router();
const {signin} = require('../controller/admin/signin');
const { auth, adminMiddleware } = require('../middleware/adminMiddleware');
const { signup } = require('../controller/admin/signup');
const { signout } = require('../controller/admin/signout');
const { initialData } = require('../controller/admin/initialData');
const { createPage, getPage } = require('../controller/admin/page');
const { updateOrder, getCustomerOrders } = require('../controller/admin/order.admin');
const { upload } = require('../middleware/imageMiddleware');

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/signout', signout);
router.post('/initialdata', [auth,adminMiddleware], initialData);
router.post('/page/create',auth,adminMiddleware,upload.fields([
    {name: 'banners'},
    {name: 'products'}
]), createPage);

router.get('/page/:category/:type', getPage);

router.post('/order/update', auth, adminMiddleware, updateOrder);
router.post('/order/getCustomerOrders',[auth,adminMiddleware], getCustomerOrders);

router.get('/profile', auth, (req,res) => {
    res.send({user: 'My Profile'});
});

module.exports = router;

