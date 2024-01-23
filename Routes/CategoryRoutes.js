import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoriesWithLocation,
  getCategoryById,
  updateCategory,
  updateCategoryLocation,
} from "../Controller/CategoryController.js";
import { AUTHENTICATE_USER } from "../Middleware/AUTHENTIC_USER.js";
import { Router } from "express";

const router = Router();

// |------------{ USER ONLY }--------------------|

router.post("/admin/create", AUTHENTICATE_USER, createCategory);
router.put("/admin/:Id", AUTHENTICATE_USER, updateCategory);
router.put("/admin/location/:Id", AUTHENTICATE_USER, updateCategoryLocation);
router.delete("/admin/delete/:Id", AUTHENTICATE_USER, deleteCategory);

// |-------------{ ADMIN ACCESS }---------------|

router.get("/user/", AUTHENTICATE_USER, getAllCategories);
router.get("/user/:Id", AUTHENTICATE_USER, getCategoryById);
router.get("/user/location/:Id", AUTHENTICATE_USER, getCategoriesWithLocation);
export default router;
