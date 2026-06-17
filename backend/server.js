require('dotenv').config();

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
app.listen(5000, () => {
  console.log('Server Started on Port 5000');
});

app.use(
  '/api/wishlist',
  require('./routes/wishlistRoutes')
);