const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

module.exports.addOrRemoveFromCart = async (req, res) => {
  try {
    const { userId, productId, count, bookingStartDate, bookingEndDate } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productDetails = await Product.findById(productId);

    if (!productDetails) {
      return res.status(404).json({ message: 'Product Not Found' });
    }

    if (count > productDetails.unitsAvailable) {
      return res.status(400).json({ message: `Only ${productDetails.unitsAvailable} units available`});
    }

    const index = cart.products.findIndex(product => product.productId.equals(productId));

    if (index !== -1) {
      if (count > 0) {
        cart.products[index].count = count;
        cart.products[index].bookingStartDate = bookingStartDate;
        cart.products[index].bookingEndDate = bookingEndDate;
      } else {
        cart.products.splice(index, 1);
      }
    } else {
      cart.products.push({
        productId: productDetails._id,
        title: productDetails.title,
        thumbnailURL: productDetails.thumbnailURL,
        sellerUsername: productDetails.sellerUsername,
        count,
        unitsAvailable: productDetails.unitsAvailable,
        productType: productDetails.productType,
        bookingStartDate,
        bookingEndDate,
        rentedAtPrice: `(${productDetails.rentalPricePerWeek}/week, ${productDetails.rentalPricePerMonth}/month)`,
      });
    }

    await cart.save();

    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};