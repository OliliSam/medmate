import express from 'express';
import {getAllUsers, loginUser, registerUser } from '../controllers/auth.controllers.js';
import { authenticate } from '../middleware/authMiddleware.js';


const router = express.Router();
// Register a new user (for caregivers, doctors, or admins)
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get logged-in user profile (protected route, requires authentication)
router.get('/profile', authenticate, getAllUsers);

export default router;
