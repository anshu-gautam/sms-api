import Student from "../models/studentModel.js";

const studentController = {
  createStudent: async (req, res) => {
    const { name, email, grade, dob, doj, roll_number } = req.body;

    try {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Student already exists" });
      }

      const student = new Student({
        name,
        email,
        dob,
        doj,
        grade,
        roll_number,
        created_by: req.user._id,
      });

      await student.save();
      res
        .status(201)
        .json({ message: "Student created successfully", student });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating student", error: error.message });
    }
  },

  getAllStudents: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;

    const searchCriteria = {
      created_by: req.user._id,
    };
    if (search) {
      const regex = new RegExp(search, "i");
      searchCriteria.$or = [
        { name: regex },
        { email: regex },
        { grade: regex },
        { roll_number: regex },
      ];
    }

    // Pagination logic
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    try {
      const totalStudents = await Student.countDocuments(searchCriteria);
      const students = await Student.find(searchCriteria)
        .skip(skip)
        .limit(pageSize);

      res.json({
        total: totalStudents,
        page: pageNumber,
        limit: pageSize,
        students,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching students", error: error.message });
    }
  },
  getStudentsVsGrade: async (req, res) => {
    try {
      const students = await Student.aggregate([
        {
          $match: {
            created_by: req.user._id,
          },
        },
        {
          $group: {
            _id: "$grade",
            count: { $sum: 1 },
          },
        },
      ]);

      res.json(students);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching students", error: error.message });
    }
  },
  getStudentsVsAge: async (req, res) => {
    try {
      const currentYear = new Date().getFullYear();

      const students = await Student.aggregate([
        {
          $match: {
            created_by: req.user._id,
          },
        },
        {
          $addFields: {
            age: {
              $floor: {
                $divide: [
                  {
                    $subtract: [currentYear, { $year: "$dob" }],
                  },
                  1,
                ],
              },
            },
          },
        },
        {
          $group: {
            _id: "$age",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      res.json(students);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching students", error: error.message });
    }
  },
  getStudentsVsDoj: async (req, res) => {
    try {
      const students = await Student.aggregate([
        {
          $match: {
            created_by: req.user._id,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$doj" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      res.json(students);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching students", error: error.message });
    }
  },
  getStudentById: async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching student", error: error.message });
    }
  },

  updateStudentById: async (req, res) => {
    const { name, email, grade } = req.body;

    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      student.name = name || student.name;
      student.email = email || student.email;
      student.grade = grade || student.grade;

      await student.save();
      res.json({ message: "Student updated successfully", student });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating student", error: error.message });
    }
  },

  deleteStudentById: async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting student", error: error.message });
    }
  },
};

export default studentController;
