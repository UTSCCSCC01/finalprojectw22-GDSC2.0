import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DarkModeContext from "../context/darkMode/DarkModeContext"


const Login = () => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const {mode, toggleMode} = useContext(DarkModeContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };
  return (
    <div className={mode === true ? "main dark" : "main"}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-12">
            <div className="login-wrap p-5">
              <div className="user-icon text-center">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <h3 className="my-2 text-center">Student/Mentor sign in</h3>
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    className="form-control rounded-left"
                    placeholder="Username"
                    value={formValues.username}
                    onChange={handleChange}
                  />
                  <p className="text-danger field-error">
                    {formErrors.username}
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    className="form-control rounded-left"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  <p className="text-danger field-error">{formErrors.email}</p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-left"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <p className="text-danger field-error">
                    {formErrors.password}
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded w-100 p-2 login-btn"
                >
                  Login
                </button>
                <p className="register-link mt-3">
                  Does not have an account ?{" "}
                  <span>
                    <a href="/register">Register</a>

                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
