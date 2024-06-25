const Auth = require("../model/AuthModel");

const show = (req, res) => {
  Auth.show((err, data) => {
    if (err) {
      console.log("Error", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
};
const register = (req, res) => {
  const values = [req.body.name, req.body.email, req.body.password];
  Auth.register(values, (err, data) => {
    if (err) {
      console.log("Error saving data:", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
};

const login = (req, res) => {
  Auth.login([req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.log("Error", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
};

module.exports = {
  register,
  show,
  login,
};
