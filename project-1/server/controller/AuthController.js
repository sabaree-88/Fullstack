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
  const { name, email, password } = req.body;
  const values = [name, email, password];
  console.log("Registering user with values:", values); // Log values being inserted
  Auth.register(values, (err, data) => {
    if (err) {
      console.log("Error saving data:", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  Auth.login([email, password], (err, data) => {
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
