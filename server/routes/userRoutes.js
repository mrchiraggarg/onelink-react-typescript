import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import User from '../models/User.js';

const router = express.Router();

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

export default router;
