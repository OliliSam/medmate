import SpeechToTextRecord from "../models/speechtotextrecord.model.js";
import mongoose from "mongoose";

export const createSpeechToTextRecord = async(req, res) => {
    const{ caregiver_id, patient_id, text } = req.body;
    
    try {
        const newSchedule  = new MedicationSchedule({
            caregiver_id, 
            patient_id, 
            text,   
        });

        await newRecord.save();
        res.status(201).json({success: true, data: newRecord });
    } catch (error) {
      res.status(500).json({success: false, message: "Server Error"}); 
    } 
};

export const getSpeechToTextRecordsForPatient = async (req, res) => {
    try{
        const records = await SpeechToTextRecord.find({patient_id: req.params.patient_id })
        .populate('caregiver_id')
        .populate('patient_id'); 
        res.status(200).json(records);
    }
    catch (error) {
       res.status(500).json({success: false, message: 'Server error'});
    }

};

export const updateSpeechToTextRecord =async (req, res) => {
    const {text} = req.body;
    try {
        let record =await SpeechToTextRecord.findById(req.params.id);
        if (!record) {
            res.status(404).json({success: false, message: 'Speech-to-text record not found'});
        }

        record.text = text || record.text;
        

        await record.save();
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};

export const deleteSpeechToTextRecord =async (req, res) => {
    try {
        const record = await SpeechToTextRecord.findByID(req.params.id);
        if (!record) {
            res.status(404).json({success: false, message: 'Speech-to-text record not found'});
        }

        await record.remove();
        res.status(200).json({ success: true, message: 'Spech-to-text record deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};


