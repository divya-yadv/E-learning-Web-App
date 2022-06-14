import mongoose from 'mongoose';
import Course from '../models/courseModel.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    buyedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
