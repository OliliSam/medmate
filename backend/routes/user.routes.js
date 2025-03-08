import express from 'express';
import {
  getUserById,
  getUserProfile,
  updateUserProfile,
  deleteUserByID,
  registerUser, // Import the registerUser controller
} from '../controllers/user.controllers.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Routes
router.post('/register', registerUser); // Route for registering a new user
router.get('/', authenticate, getUserProfile); // Get all users (Admin only)
router.get('/:id', authenticate, getUserById); // Get a single user by ID
router.put('/profile', authenticate, updateUserProfile); // Update user profile
router.delete('/:id', authenticate, deleteUserByID); // Delete a user by ID (Admin only)

export default router;
