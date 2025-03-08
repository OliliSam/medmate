import express from 'express';
import { getAllMedications, getMedicationByID, updateMedication, deleteMedicationByID, createMedication} from "../controllers/medication.controller.js";
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createMedication).get(getMedicationByID)
router.get('/', authenticate, getAllMedications); 
router.get("/:id",authenticate, getMedicationByID);
router.put("/:id",authenticate, updateMedication);
router.delete("/:id", authenticate, deleteMedicationByID);

export default router;