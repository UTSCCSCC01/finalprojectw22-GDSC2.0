import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {v4 as uuidv4} from "uuid";
import axios from "axios"
import DarkModeContext from "../../context/darkMode/DarkModeContext"

const Register = () => {
  const initialValues = {uid: "",firstName: "", lastName: "", username: "", email: "", password: "", confirmedPassword: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const {mode, toggleMode} = useContext(DarkModeContext)

  const uid = uuidv4();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value, uid});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const res = await axios.post('/register', {
          data: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            userName: formValues.username,
            email: formValues.email,
            password: formValues.password
          }
        })
        if(res.status === 200) {
          window.location.href="/"
        }
      }catch(err) {
        window.location.href="/register"
        console.log(err)

      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!values.firstName) {
        errors.firstName = "First Name is required";
    }
    if(!values.lastName) {
        errors.lastName = "Last Name is required";
    }
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
    if(!values.confirmedPassword) {
        errors.confirmedPassword = "Confirmed password is required";
    }else if(values.confirmedPassword !== values.password) {
        errors.confirmedPassword = "Confirmed password did not match with password";
    }
    return errors;
  };
  return (
    <div className={mode === true ? "main dark" : "main"}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-12">
            <div className="register-wrap p-5">
              <div className="user-icon text-center">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <h3 className="my-2 text-center">Student/Mentor sign up</h3>
              <form className="mt-3" onSubmit={handleSubmit}>
              <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control rounded-left"
                    placeholder="First Name"
                    value={formValues.firstName}
                    onChange={handleChange}
                  />
                  <p className="text-danger field-error">
                    {formErrors.firstName}
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control rounded-left"
                    placeholder="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                  />
                  <p className="text-danger field-error">
                    {formErrors.lastName}
                  </p>
                </div>  
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
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmedPassword"
                    className="form-control rounded-left"
                    placeholder="Confirmed Password"
                    value={formValues.confirmedPassword}
                    onChange={handleChange}
                  />
                  <p className="text-danger field-error">
                    {formErrors.confirmedPassword}
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded w-100 p-2 login-btn"
                >
                  Register
                </button>
                <p className="register-link mt-3">
                  Already have an account ?{" "}
                  <span>
                    <a href="/portal">Login</a>
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

export default Register;
