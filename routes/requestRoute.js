const express = require("express");
const {
  insertRequest,
  getAdminssiontRequest,
  getStudentRequest,
  sendQr,
  rejectRequest,
  getRequestCount,
  getRegistrarRequest
} = require("../controller/RequestController");

const router = express.Router();

router.post("/insertRequest", insertRequest);
router.get("/getStudentRequest", getStudentRequest);

router.get("/getAdminssiontRequest", getAdminssiontRequest);
router.post("/sendQR", sendQr);
router.post("/rejectRequest", rejectRequest);
router.get("/getRequestCount", getRequestCount);
module.exports = router;
