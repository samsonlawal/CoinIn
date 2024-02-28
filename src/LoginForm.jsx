import "./Form.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    success: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message for the current input field
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid Email";
      isValid = false;
    }

    // Validate password
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);

    if (isValid) {
      // Submit form or perform other action
      errors.success = "Form submitted successfully!";
      console.log("Form submitted successfully:", formData);
    }
  };

  // Remove error on focus
  const handleFocus = (e) => {
    const { name } = e.target;
    // Clear error message when input is focused
    setFormErrors({ ...formErrors, [name]: "" });
  };
  return (
    <div className="form">
      <main class="main">
        {/* <!-- Login --> */}
        <section class="logIn">
          <div id="loginContent">
            <div class="details">
              <h1>Login</h1>
              <form id="registrationForm" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                {formErrors.email ? (
                  <span className="error">{formErrors.email}</span>
                ) : (
                  <span className="error"> </span>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
                {formErrors.password ? (
                  <span className="error">{formErrors.password}</span>
                ) : (
                  <span className="error"> </span>
                )}

                {formErrors.success ? (
                  <span className="success">{formErrors.success}</span>
                ) : (
                  <span className="error"> </span>
                )}

                <p>Forgotten Password?</p>
                <input type="submit" value="Log In" className="button" />

                <p>
                  Don't have an account?{" "}
                  <span class="signUp">
                    <NavLink to="/signup" className="navlink">
                      Sign Up
                    </NavLink>
                  </span>
                </p>
              </form>
            </div>
            {/* <p class="option">
              <span class="option-span">or sign in with</span>
            </p>

            <div class="icon">
              <i class="fa-brands fa-google"></i>
              <i class="fa-brands fa-apple"></i>
              <i class="fa-brands fa-linkedin-in"></i>
              <i class="fa-brands fa-facebook-f"></i>
            </div> */}
          </div>
        </section>

        {/* <!-- Sign Up --> */}
        {/* <section class="signup">
          <div class="signUpCover"></div>

          <div id="signUpContent" class="hidden">
            <div class="details">
              <h1>Sign Up</h1>
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </div>

            <p class="option">
              <span class="option-span">or sign up with</span>
            </p>

            <div class="icon">
              <i class="fa-brands fa-google"></i>
              <i class="fa-brands fa-apple"></i>
              <i class="fa-brands fa-linkedin-in"></i>
              <i class="fa-brands fa-facebook-f"></i>
            </div>

            <p>
              Already have an account? <span class="logIn">Login</span>
            </p>
          </div>
        </section> */}
      </main>
    </div>
  );
}

export default Form;
