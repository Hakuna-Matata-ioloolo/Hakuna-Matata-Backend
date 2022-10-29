const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const BillingController = require('../controllers/billing');

router.put('/', auth);
router.put('/', BillingController.create);

router.post('/', auth);
router.post('/', BillingController.get);

router.put('/virtualAccount', auth);
router.put('/virtualAccount', BillingController.createVirtualAccount);

router.post('/card', auth);
router.post('/card', BillingController.confirmCard);

module.exports = router;
