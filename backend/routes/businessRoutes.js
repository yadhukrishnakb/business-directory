const express = require("express");
const {
  getBusinesses,
  updateBusiness,
  deleteBusiness,
  addBusiness,
} = require("../controllers/businessController");

const router = express.Router();

router.get("/businesses", getBusinesses);
router.put("/business/update", updateBusiness);
router.delete("/business/:id", deleteBusiness);
router.post("/business/add-business", addBusiness);

module.exports = router;
