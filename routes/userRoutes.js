import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protected + role-based
router.get("/", protect, authorizeRoles("admin", "superadmin"), getUsers);
router.get("/:id", protect, authorizeRoles("admin", "superadmin"), getUserById);
router.post("/", protect, authorizeRoles("superadmin"), createUser);
router.put("/:id", protect, authorizeRoles("admin", "superadmin"), updateUser);
router.delete("/:id", protect, authorizeRoles("superadmin"), deleteUser);

export default router;
