import mongoose from "mongoose";

const LocatioModel = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
    },
    locationStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
const Location = mongoose.model("Location", LocatioModel);
export default Location;