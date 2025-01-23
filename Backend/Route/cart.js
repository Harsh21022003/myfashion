const express = require('express');
const { getCart, updateQuantity, removeItem } = require('../controllers/cart');

const router = express.Router();

router.post('/get-cart', getCart);
router.put('/update-quantity', updateQuantity);
router.post('/delete-items', removeItem);

module.exports = router;