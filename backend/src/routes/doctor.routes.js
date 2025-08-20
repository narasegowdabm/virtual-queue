import express from "express";
import { RegisterDoctor, getAllDoctors, getDoctorDetails, fetchAnnouncement, addAnnouncement, search } from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/register", RegisterDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.get("/search", search);
router.get("/getInfo/:doctorId", getDoctorDetails);
router.get("/announcements/:doctorId", fetchAnnouncement);
router.post("/addAnnouncement/:doctorId", addAnnouncement);

export default router;

