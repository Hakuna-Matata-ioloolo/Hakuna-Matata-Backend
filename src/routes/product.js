const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const router = express.Router();

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const ProductController = require('../controllers/product');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'upload');
    },
    filename(req, file, done) {
      done(null, uuid.v4() + '.png');
    },
  }),
  limits: { fileSize: 1024 * 1024 * 50 },
});

router.get('/list', ProductController.getList);

router.post('/', ProductController.getProduct);

router.put('/', auth);
router.put('/', admin);
router.put('/', ProductController.createProduct);

router.put('/photo', auth);
router.put('/photo', admin);
router.put('/photo', upload.single('photo'));
router.put('/photo', ProductController.uploadPhoto);

module.exports = router;
