import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  roll_no: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
