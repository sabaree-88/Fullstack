const db = require("../config/db");

const Auth = {
  show: (show) => {
    const sql = "SELECT * FROM reg";
    db.query(sql, (err, data) => {
      if (err) {
        return show(err, null);
      }
      return show(null, data);
    });
  },
  register: (reg, value) => {
    const sql = "INSERT INTO `reg`(`name`, `email`, `password`) VALUES (?,?,?)";
    db.query(sql, value, (err, data) => { 
      if (err) {
        return reg(err, null);
      }
      return reg(null, data);
    });
  },
};

module.exports = Auth;
