const express = require("express");
const router = express.Router();
const controller = require("../controllers/role.controller");

router.post("/roles", controller.createRole);
router.get("/roles", controller.getAllRoles);
router.get("/roles/:id", controller.getRoleById);
router.put("/roles/:id", controller.updateRole);
router.delete("/roles/:id", controller.deleteRole);

module.exports = router;