const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const AccountController = require('../controllers/account');

router.get('/list', auth);
router.get('/list', admin);
router.get('/list', AccountController.getList);

router.get('/', auth);
router.get('/', AccountController.getInfo);

router.post('/', AccountController.login);

router.put('/', AccountController.register);

module.exports = router;
