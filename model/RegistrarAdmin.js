const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registrarAdminSchema = new Schema(
  {
    Username: String,
    Password: String,
    Authentication: String
  },
  { timestamps: true }
);

const RegistrarAdmin = mongoose.model("RegistrarAdmin", registrarAdminSchema);
module.exports = RegistrarAdmin;
