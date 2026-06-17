const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: 'User already exists'
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({

      name,
      email,
      password: hashedPassword,

      role: 'admin'

    });

    res.status(201).json({

      message: 'User registered successfully',

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const loginUser = async (req, res) => {


  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: 'User not found'
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid password'
      });

    }

    const token = jwt.sign(

    {
      id: user._id,
      email: user.email,
      role: user.role
    },

    process.env.JWT_SECRET,

    {
      expiresIn: '7d'
    }

  );

    console.log(token);

    res.status(200).json({
      message: 'JWT TEST 123',
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getUsers = async (req, res) => {

  try {

    const users =
      await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const changePassword = async (
  req,
  res
) => {

  try {

    const {
      email,
      oldPassword,
      newPassword
    } = req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {

      return res.status(404).json({
        message: 'User not found'
      });

    }

    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message:
          'Old Password Incorrect'
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    res.status(200).json({
      message:
        'Password Updated Successfully'
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateProfile = async (req, res) => {

  try {

    const { email, name } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: 'User not found'
      });

    }

    user.name = name;

    await user.save();

    res.status(200).json({

      message:
        'Profile Updated Successfully',

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {

  registerUser,
  loginUser,
  getUsers,
  changePassword,
  updateProfile

};