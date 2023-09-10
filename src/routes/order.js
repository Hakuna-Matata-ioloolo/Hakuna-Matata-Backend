const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const OrderController = require('../controllers/order');

router.get('/', auth);
router.get('/', OrderController.get);

router.post('/', auth);
router.post('/', OrderController.getDetail);

router.get('/list', auth);
router.get('/list', admin);
router.get('/list', OrderController.getList);

module.exports = router;
