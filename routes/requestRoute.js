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
  getRequestAdminToday,
  markedOnQueueRequest,
  markedasAdoneRequest,
  scanQR,
  getAdminssiontRequestAccepted,
  getRequestAdminTodayAccepted,
  getRequestTodayAccepted,
  getStudentRequestAccepted,
  getEmailedRegistrar,
  getEmailedAdminssion
} = require("../controller/RequestController");

const router = express.Router();

router.post("/insertRequest", insertRequest);
// all request of students for the registrar that is not yet accepted
router.get("/getStudentRequest", getStudentRequest);
// all request of students for the admission that is not yet accepted
router.get("/getAdminssiontRequest", getAdminssiontRequest);

router.post("/sendQR", sendQr);
router.post("/rejectRequest", rejectRequest);
router.get("/getRequestCountReg", getRequestCountReg);
router.get("/getRequestCountAdmin", getRequestCountAdmin);

// request of students for the admission today that is not yet accepted
router.get("/requestAdminToday", getRequestAdminToday);

// request of students for the registrar today that is not yet accepted
router.get("/requestToday", getRequestToday);

// request of students for the admission today that is accepted
router.get("/requestAdminTodayA", getRequestAdminTodayAccepted);

// request of students for the registrar today that is accepted
router.get("/requestTodayA", getRequestTodayAccepted);

// all request of students for the registrar that is accepted
router.get("/getStudentRequestA", getStudentRequestAccepted);
// all request of students for the admission that is accepted
router.get("/getAdminssiontRequestA", getAdminssiontRequestAccepted);

// all request of students for the registrar that is emailed
router.get("/getEmailedRegistrar", getEmailedRegistrar);
// all request of students for the admission that is emailed
router.get("/getEmailedAdminssion", getEmailedAdminssion);

//API ENDPOINTS FOR THE DEVICE ==========================================================

router.post("/onQueue", markedOnQueueRequest);
router.post("/markComplete", markedasAdoneRequest);

router.post("/scanQR", scanQR);

module.exports = router;
