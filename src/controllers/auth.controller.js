const bcrypt = require("bcryptjs");

const User = require("../models/users.model");

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt-helpers');

//register function
exports.register = async function (req, res) {
  const passwordHash = bcrypt.hashSync(req.body.userPassword);
  try {
    let existingUser = await User.findOne({ userEmail: req.body.userEmail });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }
    let newUser = await User.create({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassword: passwordHash,
    });
    res.send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

//login function
exports.login = async function (req, res) {
  try {
    //   check if user exists
    let existingUser = await User.findOne({ userEmail: req.body.userEmail });
    if (!existingUser) {
      return res.status(400).send("Could not find user with this email");
    }
    //   validate entered password from database saved password
    const validPass = await bcrypt
      .compare(req.body.userPassword, existingUser.userPassword)
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Invalid password!" });
      });
    //   if password is invalid return error
    if (!validPass) {
      res.status(400).json({ msg: "Invalid password!" });
    }
    /**
     * Create a new access token and refresh token
     * and send it back to the user in the response header
     */
    const accessToken = generateAccessToken(existingUser._id, {
      expiresIn: 86400,
    });
    const refreshToken = generateRefreshToken(existingUser._id, {
      expiresIn: 86400,
    });

    refreshTokens.push(refreshToken);

    res
      .header('access_token', accessToken)
      .json({
        auth: true,
        msg: 'Logged in!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 86400,
        refresh_token: refreshToken,
      });

  } catch (error) {
    console.log(error);
  }
};

exports.delete = async function (req, res) {
  try {
    //   check if user exists
    let existingUser = await User.findOne({ userEmail: req.body.userEmail });
    if (!existingUser) {
      return res.status(400).send("Could not find user with this email");
    }
    //   validate entered password from database saved password
    const validPass = await bcrypt
      .compare(req.body.userPassword, existingUser.userPassword)
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Invalid password!" });
      });
    //   if password is invalid return error
    if (!validPass) {
      res.status(400).json({ msg: "Invalid password!" });
    }
    // if the password is valid, delete the user
    let deletedUser = await User.findOneAndDelete({
      userEmail: req.body.userEmail,
    });
    res.send(deletedUser);

  } catch (error) {
    console.log(error);
  }
};

exports.logout = async function (req, res) {
  const refreshToken = req.body.token;
  //the below function calls an anonymous function that filters the refresh tokens array and removes the token that is passed in the request
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

  res.json({ msg: 'Logout successful' });
};
