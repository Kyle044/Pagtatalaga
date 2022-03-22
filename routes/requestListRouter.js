const express = require("express");
const { insertRequestList } = require("../controller/RequestListController");
const router = express.Router();

router.post("/insertRequestList", insertRequestList);

module.exports = router;
