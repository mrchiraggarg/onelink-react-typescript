import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    bio: { type: String },
    avatar: { type: String }, // URL for profile picture
    socials: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
