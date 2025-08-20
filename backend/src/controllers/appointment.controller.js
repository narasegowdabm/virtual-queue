import asyncHandler from "../utilis/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { startOfDay, endOfDay } from 'date-fns';
import { io } from '../../app.js';
import twilio from 'twilio';

const accountSid = process.env.accountSid;  
const authToken = process.env.authToken;  
const client = new twilio(accountSid, authToken);

export const bookAppointment = asyncHandler(async (req, res, next) => {
     
    const { doctorId, patientName, age, gender, contact, bookedBy} = req.body;

    try {
        
        const appointment = new Appointment({
            doctorId,
            patientName,
            age,
            gender,
            contact,
            bookedBy,
            queueNumber:0
        });

        await appointment.save();
        const doctorName = await Doctor.findById(doctorId).select('fullname');
    
        // Send SMS via Twilio
        // const message = await client.messages.create({
        //     body: `Hello ${patientName}, your appointment with doctor Dr ${doctorName.fullname} has been booked successfully. Visit the website to veiw virtual queue`,
        //     to: '+91' + contact,    
        //     from: process.env.number  
        // });

        res.status(200).json({ message: 'Appointment booked and SMS sent successfully', appointment });
    } catch (error) {
        console.error(' Error in booking:', error);
        res.status(500).json({ error: 'Booked successfully but Failed to send SMS' });
    }
});

export const updateAppointment = asyncHandler(async (req, res, next) => {

    const { patientId } = req.params;

    let updatedAppointment = await Appointment.findByIdAndUpdate(patientId, { status: "Completed" }, { new: true });

    if (updatedAppointment) {
        io.emit('appointmentUpdated', updatedAppointment); // Emit event to all clients
        res.status(200).json({ message: "Appointment marked as completed successfully" });
    } else {
        res.status(404).json({ message: "Appointment not found" });
    }
});

// Controller function for getting all appointments
export const getAllAppointments = asyncHandler(async (req, res, next) => {
    
    const currentDate = new Date();
    const startOfToday = startOfDay(currentDate);
    const endOfToday = endOfDay(currentDate);

    const doctorId = req.params.doctorId;
    const userId = req.params.userId;
    
    const doctor = await Doctor.findOne({_id : doctorId});
    if(!doctor) console.log("Doctor Not found")
    
    const admin = doctor.userId.toString() === userId;

    const userAppointment = await Appointment.findOne({
        doctorId,
        bookedBy : userId,
        date: { $gte: startOfToday, $lte: endOfToday }
    });

    if (!userAppointment && !admin) {
        return res.status(404).json({ message: 'User has not booked an appointment for today.' });
    }

    const appointments = await Appointment.find({doctorId, date: { $gte: startOfToday, $lte: endOfToday }});
    
    res.status(200).json(appointments);
});

export const getAllUserAppointments = asyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    try {
        // Fetch user appointments
        const userAppointments = await Appointment.find({ bookedBy: userId });
        
        // Fetch doctor details for each appointment
        const appointmentsWithDoctorDetails = await Promise.all(userAppointments.map(async (appointment) => {
            const doctor = await Doctor.findById(appointment.doctorId);
            return {
                ...appointment._doc,
                doctorName: doctor ? doctor.fullname : 'Unknown Doctor'
            };
        }));
        
        res.status(200).json(appointmentsWithDoctorDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to retrieve user appointments", error: error.message });
    }
});