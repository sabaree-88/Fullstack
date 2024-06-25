import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RegValidation from "./validation/RegisterValidation";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
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
    setError(RegValidation(values));
    if (error.name === "" && error.email === "" && error.password) {
      axios
        .post("http://localhost:8081/log", values)
        .then((res) => {
          alert();
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div className="d-flex bg-dark vh-100 justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3 ">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group mt-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              onChange={handleInputs}
            />
            {error.name && (
              <span className="text-danger fs-6">{error.name}</span>
            )}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
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
            Register
          </button>
        </form>
        <p className="my-2">
          If you have an account please <Link to={"/"}>login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
