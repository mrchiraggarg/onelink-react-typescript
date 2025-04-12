import User from '../models/User.js';

export const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Hide sensitive info
        const { password, email, ...publicProfile } = user._doc;
        res.status(200).json(publicProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
