const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  signToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET || "jwtsecret");
  },
  verifyToken: (token) => {
    return jwt.verify(token, JWT_SECRET || "jwtsecret");
  },
};
