const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/portfolioController");

router.post("/sendEmail", sendEmail);

module.exports = router;
