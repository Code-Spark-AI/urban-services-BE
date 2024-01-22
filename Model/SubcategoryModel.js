import mongoose from "mongoose";

const SubCategoryModel = new mongoose.Schema(
  {
    Subcategoryname: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const SubCategory = mongoose.model("SubCategory", SubCategoryModel);

export default SubCategory;
