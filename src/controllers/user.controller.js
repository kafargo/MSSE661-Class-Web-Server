const bcrypt = require("bcryptjs");
const User = require("../models/users.model");

//function to test token authentication
exports.getUser = async (req, res) => {
  try {
    let existingUser = await User.findOne({ userEmail: req.body.userEmail });
    if (!existingUser) {
      res.status(400).send("Can't find this user");
    }
    res.send(existingUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let existingUser = await User.findOne({ userEmail: req.body.userEmail });
    console.log(existingUser);
    if (!existingUser) {
      res.status(400).send("Can't find this user");
    }

    //   validate entered password from database saved password
    const validPass = await bcrypt
      .compare(req.body.userPassword, existingUser.userPassword)
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Invalid password!" });
      });

    if (!validPass) {
      res.status(400).json({ msg: "Invalid password!" });
    }

    const passwordHash = bcrypt.hashSync(req.body.newPassword);

    console.log("This user is getting updated:", req.body.userEmail);
    let updatedUser = await User.findOneAndReplace(
      { userEmail: req.body.userEmail },
      {
        userName: req.body.userName,
        userEmail: req.body.newEmail || req.body.userEmail,
        userPassword: passwordHash,
      },
      { new: true }
    );
    console.log(updatedUser);
    let newUser = await User.findOne({ userEmail: updatedUser.userEmail });
    res.send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
};
