const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: String,
    thumbnailURL: String,
    sellerUsername: String,
    unitsAvailable: Number,
    productType: String,
    bookingStartDate: Date,
    bookingEndDate: Date,
    rentedAtPrice: String,
  }],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;