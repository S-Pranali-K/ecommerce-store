const Order =
    require('../models/Order');

// Create Order

const createOrder =
    async (req, res) => {

        try {

            const {
                userEmail,
                products,
                totalAmount
            } = req.body;

            const order =
                await Order.create({

                    userEmail,

                    products,

                    totalAmount

                });

            res.status(201).json({

                message:
                    'Order Placed Successfully',

                order

            });

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

// Get User Orders

const getUserOrders =
    async (req, res) => {

        try {

            const orders =
                await Order.find({

                    userEmail:
                        req.params.email

                })
                .sort({
                    _id: -1
                });

            res.status(200).json(
                orders
            );

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

// Get All Orders

const getAllOrders =
    async (req, res) => {

        try {

            const orders =
                await Order.find()
                .sort({
                    _id: -1
                });

            res.status(200).json(
                orders
            );

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

// Update Status

const updateOrderStatus =
    async (req, res) => {

        try {

            const order =
                await Order.findByIdAndUpdate(

                    req.params.id,

                    {
                        status:
                            req.body.status
                    },

                    {
                        new: true
                    }

                );

            res.status(200).json({

                message:
                    'Status Updated',

                order

            });

        } catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    };

module.exports = {

    createOrder,

    getUserOrders,

    getAllOrders,

    updateOrderStatus

};