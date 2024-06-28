import express from "express";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", studentRoutes);

app.get("/", (req, res) => {
  res.send("Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
