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
router.post("/create", AUTHENTICATE_USER, createLocation);
// PUT ROUTE
router.put("/:Id", AUTHENTICATE_USER, updateLocationById);

// |------------{ USER ONLY }--------------------|

// GET ROUTE
router.get("/", AUTHENTICATE_USER, getAllLocations);
router.get("/:Id", AUTHENTICATE_USER, getLocationById);


export default router;
