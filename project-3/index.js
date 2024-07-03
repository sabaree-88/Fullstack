import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res)=>{
    res.status(200).send("Running");
})

app.listen(3000, () => {
  console.log(`Server is running in port 3000`);
});
