const { jwtconfig, verifyToken } = require('../utils/jwt-helpers');

module.exports = (req, res, next) => {
  const authHeader = req.headers['auth-token'] || req.headers['authorization'];

  // this first if statement just simple checks that the auth header is present
  if (!authHeader) {
    res
      .status(401)
      .json({ auth: false, msg: 'Access Denied. No token provided.' });
  }

  //the below function parses the token from the header
  const accessToken = authHeader.split(' ')[1];

  try {
    // verify the token is correct
    const user = verifyToken(accessToken, jwtconfig.access, req, res);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ msg: 'Invalid Token' });
  }
};