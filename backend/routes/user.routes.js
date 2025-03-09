import express from "express";
import {
  getUserById,
  getUserProfile,
  updateUserProfile,
  deleteUserByID,
  registerUser,
  getAllUsers,
} from "../controllers/user.controllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);
router.get("/all-users", authenticate, getAllUsers);
router
  .route("/:id")
  .get(authenticate, getUserById)
  .delete(authenticate, deleteUserByID);

export default router;
