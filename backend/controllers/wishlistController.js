const Wishlist = require('../models/Wishlist');


// Add To Wishlist
const addToWishlist = async (req, res) => {

    try {

        const {
            userId,
            productId
        } = req.body;

        const existingItem =
            await Wishlist.findOne({
                userId,
                productId
            });

        if (existingItem) {

            return res.status(400).json({
                message:
                'Product already in wishlist'
            });

        }

        const wishlistItem =
            await Wishlist.create({
                userId,
                productId
            });

        res.status(201).json({
            message:
            'Added to wishlist',
            wishlistItem
        });

    } catch (error) {

        res.status(500).json({
            message:
            error.message
        });

    }

};


// Get User Wishlist
const getWishlist = async (req, res) => {

    try {

        const wishlist =
            await Wishlist.find({
                userId:
                req.params.userId
            })
            .populate('productId');

        res.status(200).json(
            wishlist
        );

    } catch (error) {

        res.status(500).json({
            message:
            error.message
        });

    }

};


// Remove From Wishlist
const removeFromWishlist =
async (req, res) => {

    try {

        await Wishlist.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
            'Removed from wishlist'
        });

    } catch (error) {

        res.status(500).json({
            message:
            error.message
        });

    }

};


module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};