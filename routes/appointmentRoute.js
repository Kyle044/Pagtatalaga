const express = require("express");
const {
  insertAppointment,
  getAppointment,
  getAppointmentCountReg,
  getAppointmentCountAdmin,
  getAppointmentToday,
  deleteApp,
  getAppointmentAdmin,
  getAppointmentReg,
  getTodayAppointmentAdmin,
  getTodayAppointmentReg,
  editAppointment,
  deleteTime,
  addTime
} = require("../controller/AppointmentController");
const requireRegistrarLogin = require("../Middleware/requireRegistrarLogin");
const router = express.Router();

router.post("/insertApp", insertAppointment);
router.post("/editApp", editAppointment);
router.get("/getApp", getAppointment);
router.get("/getAppCountReg", getAppointmentCountReg);
router.get("/getAppCountAdmin", getAppointmentCountAdmin);
router.get("/getAppToday", getAppointmentToday);
router.get("/getAppTodayAdmin", getTodayAppointmentAdmin);
router.get("/getAppTodayReg", getTodayAppointmentReg);
router.get("/getAppReg", getAppointmentReg);
router.get("/getAppAdmin", getAppointmentAdmin);
router.post("/deleteTime", deleteTime);
router.post("/addTime", addTime);
router.delete("/deleteApp", deleteApp);
module.exports = router;
