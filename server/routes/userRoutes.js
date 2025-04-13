import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
// import verifyToken from '../middleware/uploadMiddleware.js';
import { getUserByUsername } from '../controllers/userController.js';
import User from '../models/User.js';

const router = express.Router();

// Update User Profile
router.put('/update', verifyToken, async (req, res) => {
    try {
        const { name, username, bio, avatar, socials } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username, _id: { $ne: req.user.id } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, username, bio, avatar, socials },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
});

// get profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// user profile
router.get('/:username', getUserByUsername);

// update profile picture
router.post('/upload-avatar', verifyToken, upload.single('avatar'), uploadAvatar);

export default router;
