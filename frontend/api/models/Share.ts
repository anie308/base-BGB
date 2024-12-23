import mongoose from "mongoose";

const shareSchema = new mongoose.Schema({
  packageId: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800, // Documents will be automatically deleted after 7 days
  },
});

export const Share =
  mongoose.models.Share || mongoose.model("Share", shareSchema);
