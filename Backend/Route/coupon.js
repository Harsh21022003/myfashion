const express = require('express');
const { verifyCoupon } = require('../controllers/coupon');

const router = express.Router();

router.post('/verify-coupon', verifyCoupon);

module.exports = router;