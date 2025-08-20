import express from "express"; 
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./src/db/dbConnection.js";
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Import Server from socket.io

const app = express();

const server = http.createServer(app);

app.use(
    cors({
        origin: "http://localhost:5173",
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    }
});

dotenv.config({path: './.env'})


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
import userRouter from "./src/routes/user.routes.js";
import doctorRouter from "./src/routes/doctor.routes.js";
import appointmentRouter from "./src/routes/appointment.routes.js";


// routes declaration
app.use("/user", userRouter);
app.use("/doctor", doctorRouter);
app.use("/appointment", appointmentRouter);

// WebSocket connection
io.on('connection', (socket) => {
    // console.log('A user connected');
    // socket.on('disconnect', () => {
    //     console.log('A user disconnected');
    // });
    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

export { io };

dbConnection()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
