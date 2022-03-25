const express = require("express");
const {
  insertCourse,
  getCourse,
  deleteCourse,
  editCourse
} = require("../controller/Course");
const router = express.Router();

router.post("/insertCourse", insertCourse);
router.get("/getCourse", getCourse);
router.post("/deleteCourse", deleteCourse);
router.post("/editCourse", editCourse);
module.exports = router;
