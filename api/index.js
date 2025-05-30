import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import cron from "node-cron"
import { cleanupExpiredHotels } from "./controllers/hotel.js"

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.")

        // Set up cron job to run every day at midnight
        // cron.schedule('0 0 * * *', async () => {
        //     console.log('Running daily cleanup of expired hotels...');
        //     await cleanupExpiredHotels();
        // });

    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!")
})

//Middlewares

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
      return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
      })
})

app.listen(5000, () => {
    connect()
    console.log("Connected to backend! Server running on port 3000")
})