const User = require("../models/user.model");
const Role = require("../models/role.model");

exports.createUser = async (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, role } = req.body;

    if (await User.findOne({ username }))
      return res.status(400).json({ message: "Username already exists" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    if (!(await Role.findById(role)))
      return res.status(400).json({ message: "Role not found" });

    const user = await User.create({
      username,
      password,
      email,
      fullName,
      avatarUrl,
      role,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("role");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted (soft delete)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    const user = await User.findOneAndUpdate(
      { email, username, isDeleted: false },
      { status: true },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "Invalid email or username" });

    res.json({ message: "User enabled", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    const user = await User.findOneAndUpdate(
      { email, username, isDeleted: false },
      { status: false },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "Invalid email or username" });

    res.json({ message: "User disabled", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};