const db = require("../config/db");

const Auth = {
  show: (view) => {
    const sql = "SELECT * FROM reg";
    db.query(sql, (err, data) => {
      if (err) {
        return view(err, null);
      }
      return view(null, data);
    });
  },

  register: (values, store) => {
    const sql = "INSERT INTO `reg`(`name`, `email`, `password`) VALUES (?,?,?)";
    db.query(sql, values, (err, data) => {
      if (err) {
        return store(err, null);
      }
      return store(null, data);
    });
  },

  login: (values, verifyUser) => {
    const sql = "SELECT * FROM reg WHERE `email` = ? AND `password` = ?";
    db.query(sql, values, (err, data) => {
      if (err) {
        return verifyUser(err, null);
      }
      return verifyUser(null, data);
    });
  },
};

module.exports = Auth;
