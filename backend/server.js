require('dotenv').config({

path:'./backend/.env'

});

console.log("SERVER FILE LOADED");

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/products', require('./routes/productRoutes'));

app.use(
    '/api/orders',
    require('./routes/orderRoutes')
);

// Test Route
app.get('/', (req, res) => {
  res.send('API Running Successfully');
});

// Server Start

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(

        `Server Started on Port ${PORT}`

    );

});

app.use(
  '/api/wishlist',
  require('./routes/wishlistRoutes')
);