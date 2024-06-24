import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="d-flex bg-dark vh-100 justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3 ">
        <form>
          <h2>Register</h2>
          <div className="form-group mt-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
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
        <p className="my-2">If you have an account please <Link to={"/"}>login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
