import { Doctor } from "../models/doctor.model.js";

const bookingTimeCheck = async (req, res, next) => {
    try {

        const { doctorId } = req.body;
        
        // Get the current date and time
        const now = new Date();
        const currentDay = now.toLocaleString('en-US', { weekday: 'long' });  // Get current day name (e.g., 'Monday')
        const currentTime = now.toTimeString().slice(0, 5);  // Get time in HH:mm format

        const doctor = await Doctor.findById(doctorId);

        // Check if the doctor has availability for the current day
        const availability = doctor.availability.find(a => a.day === currentDay);

        if (!availability) {
            return res.status(400).json({ message: `Doctor is not available today (${currentDay}).` });
        }

        const { start, end } = availability;
        if (currentTime >= start && currentTime <= end) {
            next();
        } else {
            
            return res.status(400).json({ message: `Doctor is only available between ${start} and ${end} today (${currentDay}).` });
        }
    } catch (error) {

        console.error("Error in booking time check middleware:");
        return res.status(500).json({ message: "Internal server error." });
    }
};

export default bookingTimeCheck;
