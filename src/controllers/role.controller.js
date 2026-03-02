const Role = require("../models/role.model");

exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exist = await Role.findOne({ name, isDeleted: false });
    if (exist) return res.status(400).json({ message: "Role already exists" });

    const role = await Role.create({ name, description });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isDeleted: false });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!role) return res.status(404).json({ message: "Role not found" });

    res.json({ message: "Role deleted (soft delete)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};