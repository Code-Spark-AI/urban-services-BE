import {
  createAppointmentAdmin,
  createBooking,
  getAppointmentByIdAdmin,
  getAppointmentsForUserAdmin,
  getBookingById,
  getProviderBookings,
  updateAppointmentFeedbackAdmin,
  updateAppointmentPaymentStatusAdmin,
  updateAppointmentStatusAdmin,
  updateBookingFeedback,
} from "../Controller/BookingController.js";
import { Router } from "express";
import { AUTHENTICATE_USER } from "../Middleware/AUTHENTIC_USER.js";

const router = Router();

// ADMIN ROUTES
router.post("/admin/appointments", createAppointmentAdmin);
router.get("/admin/appointments/user/:Id", getAppointmentsForUserAdmin);
router.get("/admin/appointments/:Id", getAppointmentByIdAdmin);
router.put("/admin/appointments/:id/status", updateAppointmentStatusAdmin);
router.put(
  "/admin/appointments/:id/payment-status",
  updateAppointmentPaymentStatusAdmin
);
router.put("/admin/appointments/:Id/feedback", updateAppointmentFeedbackAdmin);

// SERVICE PROVIDER ROUTES
router.get("/provider/bookings", AUTHENTICATE_USER, getProviderBookings);
router.post("/provider/bookings", AUTHENTICATE_USER, createBooking);
router.get("/provider/bookings/:Id", AUTHENTICATE_USER, getBookingById);
router.put(
  "/provider/bookings/:Id/feedback",
  AUTHENTICATE_USER,
  updateBookingFeedback
);

export default router;
