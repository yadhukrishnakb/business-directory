const express = require("express");
const { getBusinesses } = require("../controllers/businessController");

const router = express.Router();

router.use("/businesses", getBusinesses);

module.exports = router;
