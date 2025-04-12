import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Update User Profile
router.put('/update', verifyToken, async (req, res) => {
    try {
        const { name, bio, avatar, socials } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, bio, avatar, socials },
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


export default router;
