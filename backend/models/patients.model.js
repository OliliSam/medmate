import mongoose  from "mongoose";

const patientsSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    allergies: {
        type: String,
        required: true 
    },
    admission_date: {
        type: Date,
        required: true
    },
    care_level: {
        type:String,
        required: true 
    },
},{
  timestamps: true //createdAt, UpdatedAt
});

const Patients = mongoose.model('Patient', patientsSchema);

export default Patients;