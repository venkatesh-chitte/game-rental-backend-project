const Wishlist = require('../models/wishList.model');
const Product = require('../models/product.model');

module.exports.saveOrRemoveFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    const index = wishlist.products.findIndex(product => product.productId.equals(productId));

    if (index !== -1) {
      wishlist.products.splice(index, 1);
    } else {
      const productDetails = await Product.findById(productId);

      if (!productDetails) {
        return res.status(404).json({ message: 'Product Not Found' });
      }

      wishlist.products.push({
        productId: productDetails._id,
        title: productDetails.title,
        thumbnailURL: productDetails.thumbnailURL,
        sellerUsername: productDetails.sellerUsername,
        unitsAvailable: productDetails.unitsAvailable,
        productType: productDetails.productType,
        rentalStartingFromPrice: productDetails.rentalPricePerWeek,
      });
    }

    await wishlist.save();

    res.status(200).json(wishlist.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};