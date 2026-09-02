const Business = require("../models/Business");

const getBusinesses = async (request, response) => {
  try {
    const business = await Business.find();
    if (business.length === 0) {
      return response.status(404).json({ message: "Empty!" });
    }
    return response.status(200).json({ business });
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

module.exports = { getBusinesses };
