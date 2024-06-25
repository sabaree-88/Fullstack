const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth",
});

db.connect((err) => {
  if (err) {
    console.log("Failed to connect the Database" + err);
  }
  console.log("Database Connected");
});

module.exports = db;