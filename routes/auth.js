import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - studentId
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               studentId:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, studentId,phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      studentId: studentId,
      phone: phone||crypto.randomUUID(),
    });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const message = `An account with this ${field} already exists.`;
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router; 