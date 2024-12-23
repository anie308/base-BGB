import mongoose from "mongoose";

const savePackageSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SavePackage =
  mongoose.models.SavePackage ||
  mongoose.model("SavePackage", savePackageSchema);
