const express = require("express");
const { insertCourse } = require("../controller/Course");
const router = express.Router();

router.post("/insertCourse", insertCourse);

module.exports = router;
