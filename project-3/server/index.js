import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import BookRouter from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";
import UserRoute from "./routes/UserRoutes.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));
const buildPath = path.join(__dirname, "..", "app", "dist");
app.use(express.static(buildPath));

app.use("/book", BookRouter);
app.use("/user", UserRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
const ConnURI = process.env.MONGODBURI;

mongoose
  .connect(ConnURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));
