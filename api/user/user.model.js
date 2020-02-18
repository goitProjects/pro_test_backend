import mongoose from 'mongoose';
import { UserDao } from './user.dao';

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, match: /@/, unique: true },
    passwordHash: String,
    role: { type: String, required: true, default: 'user' },
  },
  {
    timestamps: true,
  },
);

userSchema.loadClass(UserDao);
export const userModel = mongoose.model('User', userSchema);
