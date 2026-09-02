const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  phone: [{ type: String, required: true, trim: true }],
  location: { type: String, required: true, trim: true },
  services: [{ type: String, required: true, trim: true }],
  workingHours: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Business", businessSchema);
