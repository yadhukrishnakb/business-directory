const jwt = require("jsonwebtoken");

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({
      message: "Authentication required. Please provide a valid access token!",
    });
  }
  const jwtToken = authHeader.split(" ")[1];
  if (!jwtToken) {
    return response.status(401).json({
      message: "Authentication required. Please provide a valid access token!",
    });
  }

  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return response
        .status(401)
        .json({ message: "Invalid or expired access token!" });
    }

    next();
  });
};

module.exports = { authenticateToken };
