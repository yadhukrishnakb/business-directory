const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const businessRoutes = require("./routes/businessRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", businessRoutes);

const PORT = process.env.PORT || 3000;

const connectDbAndStartServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log("Server Started!"));
  } catch (err) {
    console.log(`Server Failure: ${err.message}`);
  }
};

connectDbAndStartServer();
