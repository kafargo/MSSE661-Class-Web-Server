const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtconfig = require("../jwt-config");

const Recipe = require("../models/users.model");
const User = require("../models/users.model");

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
    // if the password is valid, create token and send it to the user
    const token = jwt.sign({ _id: existingUser._id }, jwtconfig.secret);
    res
      .header("auth-token", token)
      .send({ auth: true, msg: "User logged in!", token: token });
  } catch (error) {
    console.log(error);
  }
};
