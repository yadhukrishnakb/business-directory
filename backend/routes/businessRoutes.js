const express = require("express");
const {
  getBusinesses,
  updateBusiness,
  deleteBusiness,
  addBusiness,
} = require("../controllers/businessController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/businesses", getBusinesses);
router.put("/business/update", authenticateToken, updateBusiness);
router.delete("/business/:id", authenticateToken, deleteBusiness);
router.post("/business/add-business", authenticateToken, addBusiness);

module.exports = router;
