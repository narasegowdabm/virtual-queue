import express from "express";
import { bookAppointment, getAllAppointments, updateAppointment, getAllUserAppointments} from "../controllers/appointment.controller.js";
import {authLoginCheck, authLogout} from "../middlewares/auth.middleware.js";
import bookingTimeCheck from "../middlewares/booking.middleware.js";

const router = express.Router();

router.post("/bookAppointment", bookingTimeCheck, bookAppointment);
router.get("/getQueueList/:doctorId/:userId", getAllAppointments);
router.put("/update/patient/status/:patientId", updateAppointment);
router.get("/getAllUserAppointments/:userId", getAllUserAppointments);

export default router;
