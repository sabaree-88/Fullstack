const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");

router.get("/", AuthController.show);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/checkAuth",AuthController.verifyJwt, AuthController.checkAuth)

module.exports = router;