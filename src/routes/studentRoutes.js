import express from "express";
import studentController from "../controllers/studentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/students", auth, studentController.createStudent);
router.get("/students", auth, studentController.getAllStudents);
router.get("/students-vs-grade", auth, studentController.getStudentsVsGrade);
router.get("/students-vs-doj", auth, studentController.getStudentsVsDoj);
router.get("/students-vs-age", auth, studentController.getStudentsVsAge);
router.get("/students/:id", auth, studentController.getStudentById);
router.put("/students/:id", auth, studentController.updateStudentById);
router.delete("/students/:id", auth, studentController.deleteStudentById);

export default router;
