const jwt = require('jsonwebtoken');

// jwt secrets for both of the tokens
const jwtconfig = {
  access: 'sectetkeyforaccess',
  refresh: 'sectetkeyforrefresh',
};

// an array to store the refresh tokens created
const refreshTokens = [];

/**
 * expireIn is an object that can be a string or number in seconds
 *
 * usage: {@link https://www.npmjs.com/package/jsonwebtoken}
 *
 * example:
 *  { expiresIn: 86400 } for 24 hours in seconds
 */

// create a new auth token
const generateAccessToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.access, expiresIn);

// create a new re-auth token
const generateRefreshToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.refresh, expiresIn);

// check token validity
const verifyToken = (token, secret, _req, res) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    res.status(500).json({ auth: false, msg: 'Invalid token.' });
  }
};

//ES6 exports
module.exports = {
  jwtconfig,
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};