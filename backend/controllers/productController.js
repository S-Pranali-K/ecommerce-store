const Product = require('../models/Product');


// Add Product
const addProduct = async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      image,
      stock,
      category,
      rating
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      stock,
      category,
      rating
    });

    res.status(201).json({
      message: 'Product added successfully',
      product
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Get All Products
const getProducts = async (req, res) => {

  try {

    const products = await Product.find().sort({ _id: -1 });
    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get Single Product
const getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: 'Product not found'
      });

    }

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const deleteProduct = async (req, res) => {

  try {

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        message: 'Product not found'
      });

    }

    res.status(200).json({
      message: 'Product deleted successfully'
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateProduct = async (req, res) => {

  try {

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    if (!product) {

      return res.status(404).json({
        message: 'Product not found'
      });

    }

    res.status(200).json({
      message: 'Product updated successfully',
      product
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const addReview = async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        message: 'Product not found'
      });

    }

    const {
      user,
      rating,
      comment
    } = req.body;

    product.reviews.push({

      user,

      rating,

      comment

    });

    await product.save();

    res.status(200).json({

      message:
        'Review Added Successfully',

      product

    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message

    });

  }

};

module.exports = {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  addReview
};