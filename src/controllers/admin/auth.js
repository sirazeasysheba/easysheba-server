const User = require("../../models/auth");
const jwt = require("jsonwebtoken");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({ message: "Admin already exits" });
    }
    const { _id, name, username, email, contactNumber, password } = req.body;
    const _user = new User({
      _id,
      name,
      username,
      email,
      contactNumber,
      password,
      role: "admin",
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      if (data) {
        return res.status(201).json({ message: "Admin created successfully" });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_TOKEN,
          {
            expiresIn: "90d",
          }
        );

        const { _id, name, username, email, role, contactNumber } = user;
        res.cookie("token", token, { expiresIn: "90d" });
        res.status(200).json({
          token,
          user: {
            _id,
            name,
            username,
            email,
            contactNumber,
            role,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong!!!" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Sign out successfully" });
};
