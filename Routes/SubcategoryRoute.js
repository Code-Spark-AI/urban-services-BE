import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCateegory,
} from "../Controller/SubCategoryController.js";
import { AUTHENTICATE_USER } from "../Middleware/AUTHENTIC_USER.js";

const router = Router();

// |------------{ USER ONLY }--------------------|

router.get("/user/", getAllSubCategories);
router.get("/user/:Id", getSubCategoryById);

// |-------------{ ADMIN ACCESS }---------------|

router.post("/admin/create", AUTHENTICATE_USER, createSubCategory);
router.put("/admin/:Id", AUTHENTICATE_USER, updateSubCateegory);
router.delete("/admin/delete/:id", AUTHENTICATE_USER, deleteSubCategory);

export default router;
