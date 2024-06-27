const Auth = require("../model/AuthModel");
import jwt from 'jsonwebtoken';

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
    if(data.length > 0){
      const id = data[0].id;
      const tkn = jwt.sign({id}, "screateKey", {expiresIn:300});
      return res.json({Login:true, tkn, data});
    }else{
      return res.json("Failed");
    }
  });
};

module.exports = {
  register,
  show,
  login,
};
