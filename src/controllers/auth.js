const User = require("../models/auth");

const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../common-middleware");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({ message: "User already exits" });
    }
    const { name, username, email, contactNumber, password } = req.body;
    const _user = new User({ name, username, email, contactNumber, password });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: "Something went wrong" });
      } else {
        return res.status(201).json({ message: "User created successfully" });
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
      if (user.authenticate(req.body.password) && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        const { _id, name, username, email, role, contactNumber } = user;
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
  return res.status(200).json({ message: "Sign out Successfully" });
};
