import connectDB from "../config/db.js";
import Student from "../models/studentModel.js";

const addSampleData = async () => {
  await connectDB();

  const stud = new Student({
    roll_no: 1001,
    name: "Madison Hyde",
    year: 3,
    subjects: ["DBMS", "OS", "Graph Theory", "Internet Programming"],
  });

  try {
    await stud.save();
    console.log("One entry added");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

addSampleData();
