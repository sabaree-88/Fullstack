import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import BookRouter from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";
import UserRoute from "./routes/UserRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/book", BookRouter);
app.use("/user", UserRoute);

const PORT = process.env.PORT;
const ConnURI = process.env.MONGODBURI;

mongoose
  .connect(ConnURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running in port ${PORT}`);
    });
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));
