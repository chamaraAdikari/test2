import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        ).select('username email isAdmin country city phone');
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch(err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent deleting admin users
        if (user.isAdmin) {
            return res.status(403).json({ message: "Admin users cannot be deleted" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted successfully" });
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('username email isAdmin createdAt country city phone');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
            .select('_id username email isAdmin country city phone createdAt')
            .lean();
        
        if (!users || users.length === 0) {
            return res.status(200).json([]);
        }
        
        console.log("Fetched users:", users); // Add logging
        res.status(200).json(users);
    } catch(err) {
        console.error("Error fetching users:", err); // Add error logging
        next(err);
    }
}