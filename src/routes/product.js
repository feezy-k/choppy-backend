const express = require('express');
const router = express.Router();
const { addProduct, getProductsBySlug, deleteProductById, getProducts, getProductDetailsById } = require('../controller/product');
const { auth, adminMiddleware } = require('../middleware/adminMiddleware');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
      // cb(null, uniqueSuffix + file.originalname)
    }
  })

  const upload = multer({ storage });

router.post('/product/create', [auth,adminMiddleware,upload.array('productPicture')], addProduct);
router.get("/products/:slug", getProductsBySlug);
router.get('/product/:productId', getProductDetailsById);
router.delete('/product/deleteProductById',[auth,adminMiddleware],deleteProductById);
router.post('/product/getProducts',[auth,adminMiddleware],getProducts);


module.exports = router;
