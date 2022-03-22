const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    Office: String,
    Date: String,
    Time: [
      {
        Time: String,
        Request: { type: Object, default: { Status: "Pending" } }
      }
    ]
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
