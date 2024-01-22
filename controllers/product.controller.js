const Product = require('../models/product.model');

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, {
      _id: 1,
      title: 1,
      thumbnailURL: 1,
      sellerUsername: 1,
      unitsAvailable: 1,
      productType: 1,
      rentalPricePerWeek: 1,
      rentalPricePerMonth: 1,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports.getProductDetails = async (req, res) => {
    try {
      const productId = req.params.productId;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product Not Found' });
      }
  
      res.status(200).json({
        productId: product._id,
        title: product.title,
        thumbnailURL: product.thumbnailURL,
        sellerUsername: product.sellerUsername,
        unitsAvailable: product.unitsAvailable,
        productType: product.productType,
        productImages: product.productImages || [], // Assuming you have an array for product images
        rentalPricePerWeek: product.rentalPricePerWeek,
        rentalPricePerMonth: product.rentalPricePerMonth,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};




//Seller functionalities

module.exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      thumbnailURL,
      sellerUsername,
      unitsAvailable,
      productType,
      productImages,
      rentalPricePerWeek,
      rentalPricePerMonth
    } = req.body;

    if (!title || !thumbnailURL || !sellerUsername || !unitsAvailable || !productType || !rentalPricePerWeek || !rentalPricePerMonth) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = new Product({
      title,
      thumbnailURL,
      sellerUsername,
      unitsAvailable,
      productType,
      productImages,
      rentalPricePerWeek,
      rentalPricePerMonth
    });

    await product.save();

    res.status(200).json({
      productID: product._id,
      title: product.title,
      thumbnailURL: product.thumbnailURL,
      sellerUsername: product.sellerUsername,
      unitsAvailable: product.unitsAvailable,
      productType: product.productType,
      productImages: product.productImages,
      rentalPricePerWeek: product.rentalPricePerWeek,
      rentalPricePerMonth: product.rentalPricePerMonth
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



//Update product

module.exports.updateProduct = async (req, res) => {
  try {
    const {
      productID,
      title,
      thumbnailURL,
      sellerUsername,
      unitsAvailable,
      productType,
      productImages,
      rentalPricePerWeek,
      rentalPricePerMonth
    } = req.body;

    if (!productID) {
      return res.status(400).json({ message: 'Please provide a productID' });
    }

    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).json({ message: 'Product Not Found' });
    }

    product.title = title || product.title;
    product.thumbnailURL = thumbnailURL || product.thumbnailURL;
    product.sellerUsername = sellerUsername || product.sellerUsername;
    product.unitsAvailable = unitsAvailable || product.unitsAvailable;
    product.productType = productType || product.productType;
    product.productImages = productImages || product.productImages;
    product.rentalPricePerWeek = rentalPricePerWeek || product.rentalPricePerWeek;
    product.rentalPricePerMonth = rentalPricePerMonth || product.rentalPricePerMonth;

    await product.save();

    res.status(200).json({
      productID: product._id,
      title: product.title,
      thumbnailURL: product.thumbnailURL,
      sellerUsername: product.sellerUsername,
      unitsAvailable: product.unitsAvailable,
      productType: product.productType,
      productImages: product.productImages,
      rentalPricePerWeek: product.rentalPricePerWeek,
      rentalPricePerMonth: product.rentalPricePerMonth
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};