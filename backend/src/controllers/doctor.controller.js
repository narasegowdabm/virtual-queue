import asyncHandler from "../utilis/asyncHandler.js";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { Doctor, Announcement } from "../models/doctor.model.js";

export const RegisterDoctor = asyncHandler(async (req, res, next) => {
    
    const { userId, fullname, hospitalname, email, phone, address, gender, specializations, qualifications, availability } = req.body;
   
    // checking the info provided by the admin
    if (!userId || !fullname || !hospitalname || !email || !phone || !address || !gender || !specializations || !qualifications || !availability) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // check if the doctor already exists
        let existedDoctor = await Doctor.findOne({ email });
        if (existedDoctor) {
            console.log("Doctor with this email already registered");
            return res.status(400).json({ message: "Doctor with this email already registered" });
        }
        const filteredAvailability = availability.filter(item => item.day && item.start && item.end);
        // create new doctor
        const createdDoctor = await Doctor.create({
            userId,
            fullname,
            hospitalname,
            email,
            phone,
            address,
            gender,
            specializations,
            qualifications,
            availability:filteredAvailability
        });

        return res.status(201).json({ message: "Doctor registered successfully", data: createdDoctor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//! Getting all doctors by user
export const getAllDoctors = asyncHandler(async (req, res, next) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
});

export const getDoctorDetails = asyncHandler(async (req, res, next) => {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' }); 
    }
    const token = req.cookies.token;
    let isAdmin = false;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            const decodedUserId = new mongoose.Types.ObjectId(decoded.user.id);
            if (decodedUserId.equals(doctor.userId)) {
                isAdmin = true;
            }
        } catch (error) {
            console.log('Invalid token:', error.message);
        }
    } 
    const doctorDetails = { ...doctor._doc, admin: isAdmin };
    res.status(200).json(doctorDetails);
});

export const fetchAnnouncement =  asyncHandler(async (req, res, next) =>{
    const doctorId = req.params.doctorId;
    const announcements = await Announcement.find({ userId: doctorId });
    res.status(200).json(announcements);
})

export const addAnnouncement = asyncHandler(async (req, res, next) =>{
    
    const doctorId = req.params.doctorId;
    const createAnnouncement = await Announcement.create({
        userId: doctorId,
        announcement: req.body.announcement
    });
    return res.status(201).json({ message: "Announcement created successfully"});

})

export const search = asyncHandler(async (req, res, next) =>{
    const { query, specializations } = req.query;
    
    let filter = {};

    if (query && query !== "") {
        filter.fullname = new RegExp(query, 'i');
    }

    if (specializations && specializations !== "All") {
        filter.specializations = new RegExp(specializations, 'i');
    }
    
    try {
        const doctors = await Doctor.find(filter);
        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Server error" });
    }
})