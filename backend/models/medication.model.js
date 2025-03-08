import mongoose  from "mongoose";

const medicationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    side_effects: {
        type: String,
        required: true 
    },
    
},{
  timestamps: true //createdAt, UpdatedAt
});

const Medications = mongoose.model('Medication', medicationSchema);

export default Medications;