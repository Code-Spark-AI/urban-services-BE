import { Router } from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getSingleService,
  updateService,
} from "../Controller/ServiceController.js";
import { AUTHENTICATE_USER } from "../Middleware/AUTHENTIC_USER.js";

const router = Router();

//   |-------------{ ADMIN ACCESS }------------|

router.post("/admin/create/", AUTHENTICATE_USER, createService);
router.put("/admin/:Id", AUTHENTICATE_USER, updateService);
router.delete("/admin/delete/:Id", AUTHENTICATE_USER, deleteService);

//   |-------------{ USER ONLY }---------------|

router.get("/", AUTHENTICATE_USER, getAllServices);
router.get("/:Id", AUTHENTICATE_USER, getSingleService);
export default router;
