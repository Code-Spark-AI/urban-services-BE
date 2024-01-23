import Booking from "../Model/BookingModel.js";

// ADMIN

const createAppointmentAdmin = async (req, res) => {
  try {
    const { user_id, service_id, dates, status, payment_status, feedback } =
      req.body;

    const newAppointment = {
      user_id,
      service_id,
      dates,
      status,
      payment_status,
      feedback,
    };

    const booking = await Booking.create({
      appointments: [newAppointment],
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment (admin):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAppointmentsForUserAdmin = async (req, res) => {
  try {
    const userId = req.params.Id;
    const bookings = await Booking.find({ user_id: userId })
      .populate("service_id")
      .exec();

    const appointments = bookings.reduce((allAppointments, booking) => {
      return allAppointments.concat(booking.appointments);
    }, []);

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments for user (admin):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAppointmentByIdAdmin = async (req, res) => {
  try {
    const Id = req.params.Id;

    const booking = await Booking.findOne({ "appointments._id": id })
      .populate("service_id")
      .exec();

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    const appointment = booking.appointments.find(
      (appointment) => appointment._id.toString() === id
    );

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    console.error("Error fetching appointment by ID (admin):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateAppointmentStatusAdmin = async (req, res) => {
  try {
    const Id = req.params.Id;
    const { status } = req.body;

    const updatedAppointment = await Booking.findOneAndUpdate(
      { "appointments._id": Id },
      { $set: { "appointments.$.status": status } },
      { new: true }
    ).exec();

    if (!updatedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment status (admin):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateAppointmentPaymentStatusAdmin = async (req, res) => {
  try {
    const Id = req.params.Id;
    const { payment_status } = req.body;

    const updatedAppointment = await Booking.findOneAndUpdate(
      { "appointments._id": Id },
      { $set: { "appointments.$.payment_status": payment_status } },
      { new: true }
    ).exec();

    if (!updatedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointment payment status updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment payment status (admin):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateAppointmentFeedbackAdmin = async (req, res) => {
  try {
    const Id = req.params.Id;
    const { user_id, rating, comment } = req.body;

    // Update the feedback for the specified appointment
    const updatedAppointment = await Booking.findOneAndUpdate(
      { "appointments._id": Id },
      {
        $set: {
          "appointments.$.feedback.user_id": user_id,
          "appointments.$.feedback.rating": rating,
          "appointments.$.feedback.comment": comment,
        },
      },
      { new: true }
    ).exec();

    if (!updatedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointment feedback updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment feedback (admin):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Service Provider

// Get Provider's Bookings Controller
const getProviderBookings = async (req, res) => {
  try {
    const { userId } = req.user;
    const bookings = await Booking.find({ user_id: userId })
      .populate("service_id")
      .exec();
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching provider bookings:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Create Booking Controller
const createBooking = async (req, res) => {
  try {
    const { userId } = req.user;
    const { service_id, dates } = req.body;

    const booking = await Booking.create({
      user_id: userId,
      service_id,
      dates,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Booking by ID Controller
const getBookingById = async (req, res) => {
  try {
    const { userId } = req.user;
    const { Id } = req.params;

    const booking = await Booking.findOne({ _id: Id, user_id: userId })
      .populate("service_id")
      .exec();

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateBookingFeedback = async (req, res) => {
  try {
    const { userId } = req.user;
    const { Id } = req.params;
    const { rating, comment } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: Id, user_id: userId },
      {
        $set: {
          "feedback.$[elem].rating": rating,
          "feedback.$[elem].comment": comment,
        },
      },
      { arrayFilters: [{ "elem.user_id": userId }] }
    ).exec();

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking feedback updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking feedback:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
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
  createAppointmentAdmin,
};
