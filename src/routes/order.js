const { addOrder, getOrders, getOrder } = require("../controller/order");
const { auth, userMiddleware } = require('../middleware/userMiddleware');
const router = require("express").Router();

router.post("/addOrder", auth, userMiddleware, addOrder);
router.get("/getOrders", auth, userMiddleware, getOrders);
router.post("/getOrder", auth, userMiddleware, getOrder);

module.exports = router;
