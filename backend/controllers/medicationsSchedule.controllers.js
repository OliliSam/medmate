import MedicationSchedule from "../models/medicationSchedule.model.js";
import mongoose from "mongoose";

export const createMedicationSchedule = async(req, res) => {
    const{ patient_id, medication_id, caregiver_id, time, frequency } = req.body;
    
    try {
        const newSchedule  = new MedicationSchedule({
            patient_id,
            medication_id, 
            caregiver_id, 
            time, 
            frequency,
        });

        await newSchedule.save();
        res.status(201).json({success: true, data: newSchedule });
    } catch (error) {
      res.status(500).json({success: false, message: "Server Error"}); 
    } 
};

export const getMedicationSchedulesForPatient = async (req, res) => {
    try{
        const schedules = await MedicationSchedule.find({patient_id: req.params.patient_id })
        .populate('medication_id')
        .populate('caregiver_id'); 
        res.status(200).json(schedules);
    }
    catch (error) {
       res.status(500).json({success: false, message: 'Server error'});
    }

};

export const updateMedicationSchedule =async (req, res) => {
    const {time, frequency} = req.body;
    try {
        let schedule =await MedicationSchedule.findById(req.params.id);
        if (!schedule) {
            res.status(404).json({success: false, message: 'Medication Schedule not found'});
        }

        schedule.time = time || schedule.time;
        schedule.frequency = frequency || schedule.frequency;

        await schedule.save();
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};

export const deleteMedicationSchedule =async (req, res) => {
    try {
        const schedule = await MedicationSchedule.findByID(req.params.id);
        if (!schedule) {
            res.status(404).json({success: false, message: 'Medication Schedule not found'});
        }

        await schedule.remove();
        res.status(200).json({ success: true, message: 'Medication Schedule deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};


