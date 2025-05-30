import express from "express";
import Room from "../models/Room.js";
import { createRoom, deleteRoom, getRoom, getHotelRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE

router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE


router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);
//DELETE



router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET


router.get("/:id", getRoom);
//GET ALL


router.get("/", getHotelRooms);


export default router;