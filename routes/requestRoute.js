const express = require("express");
const {
  insertRequest,
  getAdminssiontRequest,
  getStudentRequest,
  sendQr,
  rejectRequest,
  getRequestCountReg,
  getRegistrarRequest,
  getRequestCountAdmin,
  getRequestToday,
  getRequestAdminToday
} = require("../controller/RequestController");

const router = express.Router();

router.post("/insertRequest", insertRequest);
router.get("/getStudentRequest", getStudentRequest);
//  request of students for the admission
router.get("/getAdminssiontRequest", getAdminssiontRequest);
router.post("/sendQR", sendQr);
router.post("/rejectRequest", rejectRequest);
router.get("/getRequestCountReg", getRequestCountReg);
router.get("/getRequestCountAdmin", getRequestCountAdmin);
router.get("/requestAdminToday", getRequestAdminToday);
// request of students for the registrar
router.get("/requestToday", getRequestToday);
module.exports = router;
