import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send("Running");
})

app.use('/api', router);

const PORT = process.env.PORT;
const ConnURI = process.env.MONGODBURI;

mongoose.connect(ConnURI)
.then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
  });
  console.log("Database Connected");
})
.catch(err => console.log(err));
