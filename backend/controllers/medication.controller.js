import Medication from "../models/medication.model.js";
import mongoose from "mongoose";
export const createMedication = async(req, res) => {
    const{ name, dosage, form, instructions, side_effects } = req.body;
    
    try {
        const newMedication  = new Medication({
            name,
            dosage,
            form,
            instructions,
            side_effects,
        });

        await newMedication.save();
        res.status(201).json({success: true, data: newMedication });
    } catch (error) {
      res.status(500).json({success: false, message: "Server Error"}); 
    } 
};

export const getAllMedications = async (req, res) => {
    try{
        const medications = await Medication.find();
        res.status(200).json(medications);
    }
    catch (error) {
       res.status(500).json({success: false, message: 'Server error'});
    }

};

export const getMedicationByID =async (req, res) => {
    try {
        const medication = await Medication.findByID(req.params.id);
        if (!medication) {
            res.status(404).json({success: false, message: 'Medication not found'});
        }
        res.status(200).json(medication);
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};

export const updateMedication = async (req, res) => {
    try {
        const updatedMedication = await Medication.findByIdAndUpdate(req.params.id)
        if (!updatedMedication) {
            return res.status(404).json({ message: "Medication not found" });
          }
          res.status(200).json(updatedMedication);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
    }
};      


export const deleteMedicationByID =async (req, res) => {
    try {
        const medication = await Medication.findByID(req.params.id);
        if (!medication) {
            res.status(404).json({success: false, message: 'Medication not found'});
        }

        await medication.remove();
        res.status(200).json({ success: true, message: 'Medication deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};


