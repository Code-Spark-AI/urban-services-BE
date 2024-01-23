import mongoose from "mongoose";

const ServiceModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    employee: {
      type: String,
    },
    duration: {
      type: Number,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", ServiceModel);
export default Service;
