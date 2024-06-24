import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const handleInputs = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };
  return (
    <div className="d-flex bg-dark vh-100 justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3 ">
        <form>
          <h2>Login</h2>
          <div className="form-group mt-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="examplepasswordnputPassword1"
              placeholder="Password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2 w-100">
            Login
          </button>
        </form>
        <p className="my-2">
          If you don't have an accout please{" "}
          <Link to={"/signup"}>sign up?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
