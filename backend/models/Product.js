const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  stock: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  reviews: [
    {
      user: {
        type: String
      },

      rating: {
        type: Number
      },

      comment: {
        type: String
      },

      date: {
        type: Date,
        default: Date.now
      }
    }
  ]

});

module.exports = mongoose.model(
  'Product',
  productSchema
);