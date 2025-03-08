import Reminder from "../models/reminder.model.js";
import mongoose from "mongoose";

export const createReminder = async(req, res) => {
    const{ caregiver_id, schedule_id, reminder_time, message } = req.body;
    
    try {
        const newReminder  = new Reminder({ 
            caregiver_id, 
            schedule_id,
            reminder_time, 
            message,
        });

        await newReminder.save();
        res.status(201).json({success: true, data: newReminder });
    } catch (error) {
      res.status(500).json({success: false, message: "Server Error"}); 
    } 
};

export const getRemindersForCaregiver = async (req, res) => {
    try{
        const reminders = await Reminder.find({caregiver_id: req.params.patient_id })
        .populate('schedule_id')
        .populate('caregiver_id'); 
        res.status(200).json(reminders);
    }
    catch (error) {
       res.status(500).json({success: false, message: 'Server error'});
    }

};

export const updateReminder =async (req, res) => {
    const {reminder_time, message} = req.body;
    try {
        let reminder =await Reminder.findById(req.params.id);
        if (!reminder) {
            res.status(404).json({success: false, message: 'Reminder not found'});
        }

        reminder.reminder_time = reminder_time || reminder.reminder_time;
        reminder.message = message || reminder.message;

        await reminder.save();
        res.status(200).json(reminder);
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};

export const deleteReminder =async (req, res) => {
    try {
        const reminder = await Reminder.findByID(req.params.id);
        if (!reminder) {
            res.status(404).json({success: false, message: 'Reminder not found'});
        }

        await reminder.remove();
        res.status(200).json({ success: true, message: 'Reminder deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
};


