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
  login: (login, values) => {
    const sql = "SELECT * FROM reg WHERE `email` = ? AND `password` = ?";
    db.query(sql, values, (err, data) => {
      if (err) {
        return login(err, null);
      }
      return login(null, data);
    });
  },
};

module.exports = Auth;
