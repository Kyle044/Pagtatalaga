const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    IsAccepted: { type: String, default: "NOT ACCEPTED" },
    Appointment: {},
    Office: String,
    Name: String,
    Age: String,
    StudentID: { type: String, default: "Non Student" },
    Year: String,
    Course: String,
    Purpose: [],
    Email: String,
    Status: { type: String, default: "Pending" },
    isEmailed: { type: String, default: "FALSE" },
    RequestedYear: String,
    RequestedSemester: String,
    QueueNumber: Number
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
