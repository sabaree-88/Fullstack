import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogValidation from "./validation/LoginValidation";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const handleInputs = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(LogValidation(values));
    const validationErrors = LogValidation(values);
    setError(validationErrors);
    if (error.email === "" && error.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          navigate("/home");
        })
        .catch((err) => console.error("Error posting data:", err));
    }
  };
  return (
    <div className="d-flex bg-dark vh-100 justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3 ">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group mt-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInputs}
            />
            {error.email && (
              <span className="text-danger fs-6">{error.email}</span>
            )}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleInputs}
            />
            {error.password && (
              <span className="text-danger fs-6">{error.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-2 w-100">
            Login
          </button>
        </form>
        <p className="my-2">
          Don't have an account yet? {" "}
          <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
