import express from 'express';
import {createMedicationSchedule, getMedicationSchedulesForPatient, updateMedicationSchedule, deleteMedicationSchedule} from '../controllers/medicationsSchedule.controllers.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
// Medication Schedule Routes
router.route('/').post(createMedicationSchedule).get(getMedicationSchedulesForPatient) // Create new schedule
router.get('/patient/:patient_id', authenticate, getMedicationSchedulesForPatient); // Get all schedules for a patient
router.put('/:id', authenticate, updateMedicationSchedule); // Update a schedule by ID
router.delete('/:id', authenticate, deleteMedicationSchedule); // Delete a schedule by ID

export default router;
