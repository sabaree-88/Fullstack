const Auth = require("../model/AuthModel");
const jwt = require("jsonwebtoken");

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
  console.log("Registering user with values:", values);
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
    if (data.length > 0) {
      const id = data[0].id;
      const token = jwt.sign({ id }, "screateKey", { expiresIn: 300 });
      return res.json({ Login: true, token, data });
    } else {
      return res.json("Failed");
    }
  });
};

const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.json("Need token for the next step!");
  } else {
    jwt.verify(token, "screateKey", (err, decoded) => {
      if (err) {
        res.json("Not Authenticated");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
const checkAuth = (req, res) => {
  return res.json("Authenticated");
};

module.exports = {
  register,
  show,
  login,
  checkAuth,
  verifyJwt,
};
