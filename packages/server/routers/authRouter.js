const express = require("express");
const ValidateForm = require("../controllers/validateForm");
const router = express.Router();
const {
  handleLogin,
  LoginAttempt,
  RegisterAttempt,
} = require("../controllers/authController");
const { rateLimiter } = require("../controllers/rateLimiter");

router
  .route("/login")
  .get(handleLogin)
  .post(ValidateForm, rateLimiter(60,10), LoginAttempt);

router.post("/signup", ValidateForm, rateLimiter(60,5) ,RegisterAttempt);

module.exports = router;
