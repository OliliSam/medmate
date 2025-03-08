import express from 'express';
import { createPatients, deletePatients, getPatients, updatePatients} from "../controllers/patient.controllers.js";

const router = express.Router();

router.get("/", getPatients); 
router.post('/', createPatients); 
router.put("/:id", updatePatients);
router.delete("/:id", deletePatients);

export default router;