import User from '../models/User.js';

export const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Hide sensitive info
        const { password, email, ...publicProfile } = user._doc;
        res.status(200).json(publicProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const uploadAvatar = async (req, res) => {
    try {
      const imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      const userId = req.user.id;
  
      await User.findByIdAndUpdate(userId, { avatar: imagePath }, { new: true });
      res.status(200).json({ message: 'Avatar uploaded successfully', avatar: imagePath });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading avatar' });
    }
  };
  