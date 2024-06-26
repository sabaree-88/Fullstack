const db = require("../config/db");

const Auth = {
  show: (callback) => {
    const sql = "SELECT * FROM reg";
    db.query(sql, (err, data) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, data);
    });
  },

  register: (values, callback) => {
    const sql = "INSERT INTO `reg`(`name`, `email`, `password`) VALUES (?,?,?)";
    db.query(sql, values, (err, data) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, data);
    });
  },

  login: (values, callback) => {
    const sql = "SELECT * FROM reg WHERE `email` = ? AND `password` = ?";
    db.query(sql, values, (err, data) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, data);
    });
  },
};

module.exports = Auth;
