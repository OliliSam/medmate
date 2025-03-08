import express from 'express';
import{ createReminder, getRemindersForCaregiver, updateReminder, deleteReminder} from '../controllers/reminder.controllers.js';
import { authenticate } from '../middleware/authMiddleware.js';


const router = express.Router();
// Reminder Routes
router.post('/', authenticate, createReminder); // Create a new reminder
router.get('/caregiver/:caregiver_id', authenticate, getRemindersForCaregiver); // Get reminders for a caregiver
router.put('/:id', authenticate, updateReminder); // Update a reminder by ID
router.delete('/:id', authenticate, deleteReminder); // Delete a reminder by ID

export default router;
