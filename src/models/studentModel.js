import mongoose from "mongoose";

const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  doj: {
    type: Date,
    required: true,
  },
  grade: {
    type: String,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  roll_number: {
    type: String,
    required: true,
    unique: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
