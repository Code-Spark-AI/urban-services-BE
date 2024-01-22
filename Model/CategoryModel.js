import mongoose from "mongoose";

const CategoryModel = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
    },
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategoryModel);

export default Category;
