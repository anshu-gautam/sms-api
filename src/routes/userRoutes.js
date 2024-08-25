import express from "express";
import auth from "../middleware/auth.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/users", auth, userController.getAllUsers);
router.get("/users/:id",auth, userController.getUserById);
router.put("/users/:id",auth, userController.updateUserById);
router.delete("/users/:id",auth, userController.deleteUserById);

export default router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJ1c2VySWQiOiI2NmM3NzRlNTI0Y2FhMDhlNWY1MGQ2OGYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjQzNDgxNzYsImV4cCI6MTcyNDQzNDU3Nn0
//   .ZnPtLeGCU6YmBNz0TnUe0fFQnC6QXry_X8NBzlfG7bQ;
