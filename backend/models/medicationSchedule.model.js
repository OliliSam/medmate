import mongoose  from "mongoose";

const medicationScheduleSchema = new mongoose.Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required:true
    },
    medication_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medication',
        required:true
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'biweekly', 'monthly'],
        required: true
    },
    time_of_day: [{
        type: String,
        required: true
    }],
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'TAKEN', 'MISSED'],
        default: 'PENDING',
        required: true
    },
    caregiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    
},{
  timestamps: true //createdAt, UpdatedAt
});

const MedicationSchedules = mongoose.model('MedicationSchedule', medicationScheduleSchema);

export default MedicationSchedules;