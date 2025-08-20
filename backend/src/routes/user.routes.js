import express from "express";
import { login, register, logout } from "../controllers/login_logout.controller.js";
import {authLoginCheck, authLogout} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/authCheck", authLoginCheck);
router.post("/authLogout", authLogout);


export default router;