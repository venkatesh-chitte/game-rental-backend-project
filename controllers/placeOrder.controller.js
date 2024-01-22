const Cart = require('../models/cart.model');
const Order = require('../models/placeOrder.model');
const Product = require('../models/product.model');

module.exports.placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    const orderProducts = [];

    for (const cartProduct of cart.products) {
      const productDetails = await Product.findById(cartProduct.productId);

      if (!productDetails) {
        return res.status(404).json({ message: 'Product Not Found' });
      }

      if (cartProduct.count > productDetails.unitsAvailable) {
        return res.status(400).json({ message: `Not enough units available for ${productDetails.title}` });
      }

      productDetails.unitsAvailable -= cartProduct.count;

      await productDetails.save();

      orderProducts.push({
        productId: productDetails._id,
        title: productDetails.title,
        thumbnailURL: productDetails.thumbnailURL,
        sellerUsername: productDetails.sellerUsername,
        unitsAvailable: productDetails.unitsAvailable,
        productType: productDetails.productType,
        bookingStartDate: cartProduct.bookingStartDate,
        bookingEndDate: cartProduct.bookingEndDate,
        rentedAtPrice: cartProduct.rentedAtPrice,
      });
    }

    const order = new Order({ userId, products: orderProducts });
    await order.save();

    await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } });

    res.status(200).json(orderProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};