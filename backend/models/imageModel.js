import mongoose from 'mongoose';

export const imageSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      default: 'none',
      required: true,
    },
    imageData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model('Image', imageSchema);

export default Image;
