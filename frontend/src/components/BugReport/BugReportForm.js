import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./BugReportForm.css"
const BugReportForm = () => {
    const initialValues = { email: "", bugSeverity: "", bugOccurance: "", information: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues)
        }
    };
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.bugOccurance) {
            errors.bugOccurance = "Bug Occurance is required"
        }
        if (!values.information) {
            errors.information = "Bug Information is required"
        }
        return errors;
    };
    return (
        <div className="main">
            <form onSubmit={handleSubmit}>
                <div className="bugReportForm row align-items-center justify-content-center mt-4">
                    <h1 className="text-center text-danger">Report Bug</h1>
                    <div className="col-sm-9 col-md-5 shadow p-3">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="mb-2">Your Email <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter your email" name="email"
                                onChange={handleChange} />
                            <p className="text-danger field-error">
                                {formErrors.email}
                            </p>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="bug-severity" className="mb-2">Bug Severity <span class="text-danger">*</span></label>
                            <select name="bugSeverity" id="bug-severity" className="form-control"
                                onChange={handleChange}>
                                <option value="minor">Minor</option>
                                <option value="moderate">Moderate</option>
                                <option value="major">Major</option>
                                <option value="game-breaking">Game-breaking</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label>How often does it occurs ? <span className="text-danger">*</span></label> <br />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="bugOccurance" id="rarely" value="rarely"
                                    onChange={handleChange} />
                                <label className="form-check-label" for="rarely">Rarely</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="bugOccurance" id="somewhat-rarely" value="somewhat rarely"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" for="somewhat-rarely">Somewhat Rarely</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="bugOccurance" id="somewhat-often" value="somewhat often"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" for="somewhat-often">Somewhat Often</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="bugOccurance" id="commonly" value="commonly"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" for="commonly">Commonly</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="bugOccurance" id="very" value="very"
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" for="very">Very</label>
                            </div>
                            <p className="text-danger field-error">
                                {formErrors.bugOccurance}
                            </p>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="report" className="mb-3">Add your bug information <span className="text-danger">*</span></label>
                            <textarea name="information" className="w-100" rows='5' className="form-control" placeholder="Report Bug"
                                onChange={handleChange}
                            ></textarea>
                            <p className="text-danger field-error">
                                {formErrors.information}
                            </p>
                        </div>
                        <button className="btn btn-danger w-100" type="submit">Report Bug</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BugReportForm