const express = require("express");
const cors = require("cors");
const router = require("./route/web");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/signup", router); 

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
