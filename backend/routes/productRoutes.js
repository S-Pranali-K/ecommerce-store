const express = require('express');
const router = express.Router();
const protect =
    require('../middleware/authMiddleware');
const adminOnly =
    require('../middleware/adminMiddleware');
    
const {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addReview
} = require('../controllers/productController');

router.post(
    '/',
    protect,
    adminOnly,
    addProduct
);

router.get('/', getProducts);

router.get('/:id', getSingleProduct);

router.post('/:id/review', addReview);

router.put(
    '/:id',
    protect,
    adminOnly,
    updateProduct
);

router.delete(
    '/:id',
    protect,
    adminOnly,
    deleteProduct
);

module.exports = router;