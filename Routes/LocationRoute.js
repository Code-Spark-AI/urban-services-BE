import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
} from "../Controller/LocationController.js";
import { Router } from "express";
import { AUTHENTICATE_USER } from "../Middleware/AUTHENTIC_USER.js";

// CONFIGURAION
const router = Router();

// ROUTES

// |-------------{ ADMIN ACCESS }---------------|

// POST ROUTE
router.post("/admin/create", AUTHENTICATE_USER, createLocation);
// PUT ROUTE
router.put("/admin/:Id", AUTHENTICATE_USER, updateLocationById);

// |------------{ USER ONLY }--------------------|

// GET ROUTE
router.get("/user/", AUTHENTICATE_USER, getAllLocations);
router.get("/user/:Id", AUTHENTICATE_USER, getLocationById);


export default router;
