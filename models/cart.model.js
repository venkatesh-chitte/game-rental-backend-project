const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: String,
    thumbnailURL: String,
    sellerUsername: String,
    count: { type: Number, default: 1 },
    unitsAvailable: Number,
    productType: String,
    bookingStartDate: Date,
    bookingEndDate: Date,
    rentedAtPrice: String,
  }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;