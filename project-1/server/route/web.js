const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");

router.get("/", AuthController.show);
router.post("/", AuthController.register);

module.exports = router;