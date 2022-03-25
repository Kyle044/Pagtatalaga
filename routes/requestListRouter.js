const express = require("express");
const {
  insertRequestList,
  getRequestList,
  deleteRequestList,
  editRequestList
} = require("../controller/RequestListController");
const router = express.Router();

router.post("/insertRequestList", insertRequestList);
router.post("/editRequestList", editRequestList);
router.post("/deleteRequestList", deleteRequestList);
router.get("/getRequestList", getRequestList);

module.exports = router;
