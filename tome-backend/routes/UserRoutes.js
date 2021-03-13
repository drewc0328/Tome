const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/UserControllers");

router.post("/login", UserControllers.login);
router.post("/signup", UserControllers.signup);

module.exports = router;
