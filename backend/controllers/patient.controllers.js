import Patient from "../models/patients.model.js";
import mongoose from "mongoose";
export const getPatients = async(req, res) => {
    try {
        const patients  = await Patient.find({});
        res.status(200).json({success: true, data: patients });
    } catch (error) {
      console.log("error in fetching patients:", error.message);
      res.status(500).json({success: false, message: "Server Error"}); 
    } 
};

export const createPatients = async(req, res) => {
    const patient = req.body;

    if(!patient.name || !patient.DOB || !patient.contact|| !patient.medical_Conditions || !patient.allergies || !patient.admission_date || !patient.care_level) {
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }
     
    
    const newPatient = new Patient(patient)

    try{
        await newPatient.save();
        res.status(201).json({success: true, data: newPatient});
    }   catch (error) {
        console.error("Error in creating patient:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }

};

export const updatePatients =  async (req, res) => {
    const {id} = req.params;

    const patient = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({success:false, message:"Invalid Patient Id"});
    }

    try {
       const updatedPatient= await Patient.findByIdAndUpdate(id, patient, {new:true});
       res.status(200).json({sucess: true, data: updatedPatient});
    } catch (error) {
       res.status(500).json({success: false, message: "Server Error"}); 
    }
};

export const deletePatients = async (req, res) =>{
    const{id}= req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Patient Id"});
     }
 
    try {
        await Patient.findByIdAndDelete(id);
        res.status(200).json({success: true, message:"Patient deleted"});
    } catch (error) {
       console.log("Error in deleting patient:", error.message);
       res.status(500).json({sucess:false, message: "Server Error"}); 
    }
};