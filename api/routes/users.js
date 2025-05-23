import express from "express";
import { deleteUser, getUser, updateUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Get all users - remove verifyAdmin temporarily for testing
router.get("/", getUsers);

// Get specific user
router.get("/:id", verifyUser, getUser);

// Update user
router.put("/:id", verifyUser, updateUser);

// Delete user
router.delete("/:id", verifyUser, deleteUser);

export default router;