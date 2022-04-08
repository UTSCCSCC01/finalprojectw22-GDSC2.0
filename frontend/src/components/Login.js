import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import DarkModeContext from "../context/darkMode/DarkModeContext"
import axios from "axios"

const Login = () => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [showError, setShowError] = useState(false)

  const { mode, toggleMode } = useContext(DarkModeContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(async () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post("/login", {
        data: {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
          mode: "user"
        },
      }).then((res) => {
        window.location.href = "/"
        localStorage.setItem("token", res.data.token)
      }).catch((err) => {
        setErrorMessage(err.response.data.message)
        setShowError(true)
      })
    }
  }, [formErrors])

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
              {showError && (<div class="alert alert-danger d-flex align-items-center justify-content-around">
                  <p className="m-0"><strong>Error!</strong> {errorMessage}</p>
                  <a href='#' style={{color: "black"}} onClick={() => setShowError(false)}>&times;</a>
              </div>)}
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
