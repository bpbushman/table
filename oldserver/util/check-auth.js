const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  // get the authorization header from context body

  const authHeader = context.req.headers.authorization;

  // if the authHeader exists, split token from the Bearer

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    // if token exists, verify and return user

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);

        // once the token is verified, return the user

        return user;
      } catch (err) {
        throw new AuthenticationError("invalid/Expired token");
      }
    }

    throw new Error('auth token must be "Bearer [token]');
  }

  throw new Error("Authorization header must be provided");
};
