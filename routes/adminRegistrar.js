const express = require("express");
const { Register, Signin, protected } = require("../controller/AdminReg");
const requireRegistrarLogin = require("../Middleware/requireRegistrarLogin");
const router = express.Router();

router.post("/Register", Register);
router.get("/Protected", requireRegistrarLogin, protected);
router.post("/Login", Signin);

module.exports = router;
