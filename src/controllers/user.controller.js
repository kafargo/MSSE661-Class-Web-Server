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

// exports.getUser = (req, res) => {
//     const user = req.user; 
//     res.status(200).send(user);
// };
