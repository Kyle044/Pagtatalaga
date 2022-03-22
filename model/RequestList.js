const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestListSchema = new Schema(
  {
    Request: String
  },
  { timestamps: true }
);

const RequestList = mongoose.model("RequestList", requestListSchema);
module.exports = RequestList;
