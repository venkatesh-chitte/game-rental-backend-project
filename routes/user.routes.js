const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const homepageController = require('../controllers/product.controller');

const wishlistController = require('../controllers/wishList.controller');

const cartController = require('../controllers/cart.controller');

const orderController = require('../controllers/placeOrder.controller');


router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/products', homepageController.getAllProducts);

router.get('/product/:productId', homepageController.getProductDetails);

router.put('/wishlist', wishlistController.saveOrRemoveFromWishlist);

router.put('/cart', cartController.addOrRemoveFromCart);

router.post('/place-order', orderController.placeOrder);

router.get('/user/:username', userController.viewUserDetails);

router.put('/update-user', userController.updateUserDetails);

router.post('/create-product', homepageController.createProduct);

router.put('/update-product', homepageController.updateProduct);

module.exports = router;