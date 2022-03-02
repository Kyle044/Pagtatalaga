const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    Appointment: {},
    Office: String,
    Name: String,
    Age: String,
    StudentID: String,
    Year: String,
    Course: String,
    Purpose: [],
    Email: String
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
