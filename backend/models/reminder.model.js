// import mongoose  from "mongoose";

// const reminderSchema = new mongoose.Schema({
//     medicationSchedule_id:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'MedicationSchedule',
//         required: true
//     },
//     reminder_time: {
//         type: Date,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['PENDING', 'ACKNOWLEDGED', 'MISSED'],
//         default: 'PENDING',
//         required: true
//     },

//  },

//     {
    
//       timestamps: true //createdAt, UpdatedAt

//     }
// });

// const Reminders = mongoose.model('Reminder', reminderSchema);

// export default Reminders;

import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    // Enable timestamps, automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;
