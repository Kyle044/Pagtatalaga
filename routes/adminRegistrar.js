const express = require("express");
const { Register, Signin, protected } = require("../controller/AdminReg");
const requireRegistrarLogin = require("../Middleware/requireRegistrarLogin");
const router = express.Router();

router.post("/register", Register);
router.get("/protected", requireRegistrarLogin, protected);
router.post("/login", Signin);

module.exports = router;
