const express = require("express");
const { postQR } = require("../controller/Student");
const router = express.Router();

router.post("/postQR", postQR);

module.exports = router;
