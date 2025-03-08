import mongoose  from "mongoose";

const speechtotextrecordSchema = new mongoose.Schema({
    caregiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required:true
    },
    transcription:{
        type: String,
        required: true
    },
    audio_file_url: [{
        type: String
    }],
},{
  timestamps: true //createdAt, UpdatedAt
});

const Speechtotextrecords= mongoose.model('Speechtotextrecords', speechtotextrecordSchema);

export default Speechtotextrecords; 