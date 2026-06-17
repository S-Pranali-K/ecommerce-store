const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    userEmail: {
        type: String,
        required: true
    },

    products: [
        {
            name: String,
            price: Number,
            image: String,
            quantity: Number
        }
    ],

    status: {
        type: String,
        default: 'Pending'
    },

    totalAmount: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model(
        'Order',
        orderSchema
    );