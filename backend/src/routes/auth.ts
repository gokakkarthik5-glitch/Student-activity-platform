import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middleware/validation';
import { loginSchema, registerSchema } from '../validators/authValidator';

const router = Router();

// Register
router.post('/register', validateRequest(registerSchema), async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Check if user exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ error: 'Email already registered' });
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    // const user = await User.create({
    //   email,
    //   password: hashedPassword,
    //   firstName,
    //   lastName,
    //   role: role || 'student',
    // });

    // Generate token
    const token = jwt.sign(
      { userId: 'user.id', email: email, role: role || 'student' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        // id: user.id,
        email,
        firstName,
        lastName,
        role: role || 'student',
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', validateRequest(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    // const user = await User.findOne({ email });
    // if (!user) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // Check password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // Generate token
    const token = jwt.sign(
      { userId: 'user.id', email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        // id: user.id,
        email,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

// Refresh token
router.post('/refresh', (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'secret');
    const newToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    res.json({ token: newToken });
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
