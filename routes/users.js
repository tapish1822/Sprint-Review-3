const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Create a new user (Sign Up)
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists. Please try logging in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Authenticate a user (Sign In)
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    const token = jwt.sign({ email: user.email }, 'your_secret_key_here', { expiresIn: '1h' });
    res.status(200).json({ message: 'Authentication successful.', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Example of a protected route that requires authentication
router.get('/protected', (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

module.exports = router;
