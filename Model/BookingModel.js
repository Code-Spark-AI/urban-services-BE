const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    // Assume that 'dates' is an array of available time slots for appointments
    dates: [
      {
        start: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
          required: true,
        },
      },
    ],
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    service_options: {
      type: mongoose.Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    total_amount: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
    },
    notes: {
      type: String,
    },
    feedback: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          default: null,
        },
        comment: {
          type: String,
          default: null,
        },
      },
    ],
    appointments: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        service_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        dates: [
          {
            start: {
              type: Date,
              required: true,
            },
            end: {
              type: Date,
              required: true,
            },
          },
        ],
        status: {
          type: String,
          enum: ["pending", "confirmed", "completed", "cancelled"],
          default: "pending",
        },
        payment_status: {
          type: String,
          enum: ["pending", "paid", "refunded"],
          default: "pending",
        },
        feedback: {
          user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          rating: {
            type: Number,
            default: null,
          },
          comment: {
            type: String,
            default: null,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;