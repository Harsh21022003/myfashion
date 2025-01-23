const Coupon = require('../models/Coupon');

exports.verifyCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }
    res.json({ success: true, discountPercentage: coupon.discountPercentage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};