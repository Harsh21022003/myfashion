const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true
   },
  productsInCart: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' },
      productQty: {
         type: Number, 
         required: true },
    },
  ],
});

module.exports = mongoose.model("Cart",cartSchema);
