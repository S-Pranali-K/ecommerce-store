const express = require('express');

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  changePassword,
  updateProfile
} = require('../controllers/authController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/users', getUsers);

router.put(
  '/change-password',
  changePassword
);

router.put(
  '/update-profile',
  updateProfile
);

module.exports = router;