const express = require('express');

const router = express.Router();

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist
} = require('../controllers/wishlistController');


// Add To Wishlist
router.post('/', addToWishlist);


// Get User Wishlist
router.get('/:userId', getWishlist);


// Remove From Wishlist
router.delete('/:id', removeFromWishlist);

module.exports = router;