const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLogin = async (request, response) => {
  try {
    if (!request.body.email || !request.body.password) {
      return response.status(400).json({ message: "Some fields are empty!" });
    }

    const { email, password } = request.body;

    const existingUser = await Admin.findOne({ email });

    if (!existingUser) {
      return response
        .status(404)
        .json({ message: "Invalid email or password!" });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!passwordMatched) {
      return response
        .status(400)
        .json({ message: "Invalid email or password!" });
    }

    const payload = { userId: existingUser._id, email };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return response.status(200).json({ jwt_token: jwtToken });
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
};

module.exports = { adminLogin };
