import mongoose from "mongoose";
import validator from "validator";

const availabilitySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    }
});

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullname: {
        type: String,
        required: true,
    },
    hospitalname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required!"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        minLength: [10, "Phone Number must contain exactly 10 digits"],
        maxLength: [10, "Phone Number must contain exactly 10 digits"],
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    specializations: {
        type: String,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,
    },
    availability: [availabilitySchema]
}, { timestamps: true });

const AnnouncementSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    announcement: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400  // 24 hours in seconds
    }
})

export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
export const Doctor = mongoose.model("Doctor", doctorSchema);

