import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    contact: {
        type: String,
        required: true,
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now // The date of the booking
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "CheckedIn", "Completed"],
        default: "Pending"
    },
    queueNumber: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

// this is called pre middleware
appointmentSchema.pre('save', async function(next) {
    
    if (this.isNew) {
        console.log('New appointment is getting created, setting queue number');
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0); 
        // Find and update the counter for the doctor and date
        const counter = await Counter.findOneAndUpdate( 
            { doctorId: this.doctorId, date: todayDate },
            { $inc: { count: 1 } },
            { new: true, upsert: true } // Create the document if it doesn't exist
        );
        
        // Assign the queue number
        this.queueNumber = counter.count;
    }
    next(); // continue with the save operation
});

export const Appointment = mongoose.model("appointment", appointmentSchema); 
export const Counter = mongoose.model("counter", counterSchema);