import express from 'express';
import {createSpeechToTextRecord, getSpeechToTextRecordsForPatient, updateSpeechToTextRecord, deleteSpeechToTextRecord} from '../controllers/speechtotextrecords.controllers.js';
import { authenticate } from '../middleware/authMiddleware.js';


const router = express.Router();
// Speech-to-Text Record Routes
router.post('/', authenticate, createSpeechToTextRecord); // Create a new speech-to-text record
router.get('/patient/:patient_id', authenticate, getSpeechToTextRecordsForPatient); // Get speech-to-text records for a patient
router.put('/:id', authenticate, updateSpeechToTextRecord); // Update a speech-to-text record by ID
router.delete('/:id', authenticate, deleteSpeechToTextRecord); // Delete a speech-to-text record by ID

export default router;
