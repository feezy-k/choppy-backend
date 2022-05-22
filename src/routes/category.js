const express = require('express');
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controller/category');
const { auth, adminMiddleware } = require('../middleware/adminMiddleware');
const router = express.Router();
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

router.post('/category/create', auth,adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/get', getCategories);
router.post('/category/update',auth,adminMiddleware,upload.array("categoryImage"),updateCategories);
router.post('/category/delete',auth,adminMiddleware,deleteCategories);
module.exports = router;
