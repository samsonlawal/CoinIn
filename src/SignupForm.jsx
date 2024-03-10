import { useState } from "react";
import "./Form.css";
import { NavLink } from "react-router-dom";
import supabase from "./config/supabaseClient";

// Toasts
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    success: "",
    errorr: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message for the current input field
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
  };

  const validateForm = async () => {
    let isValid = true;
    const errors = {};

    // if (isValid) {
    //   const { data, error } = await supabase.auth.signUp({
    //     email: "example@email.com",
    //     password: "example-password",
    //     options: {
    //       data: {
    //         fullNname: "John",
    //         age: 27,
    //       },
    //     },
    //   });
    //   // Submit form or perform other action
    //   errors.success = "Form submitted successfully!";
    //   console.log("Form submitted successfully:", formData);
    // }

    // Validate full name
    if (formData.fullname.trim() === "") {
      errors.fullname = "Full Name is required";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid Email";
      isValid = false;
    }

    // Check if email already exists
    // try {
    //   const { data, error } = await supabase
    //     .from("auth.users")
    //     .select("*")
    //     .eq("email", formData.email);

    //   if (error) {
    //     // Handle error
    //     console.error("Error checking email existence:", error.message);
    //     errors.signUp = "An error occurred. Please try again later.";
    //     isValid = false;
    //   } else if (data && data.length > 0) {
    //     // Email already exists
    //     errors.email = "Email already exists";
    //     isValid = false;
    //   }
    // } catch (error) {
    //   console.error("Error checking email existence:", error.message);
    //   errors.signUp = "An error occurred. Please try again later.";
    //   isValid = false;
    // }

    // Validate password
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (isValid) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              fullName: formData.fullname,
              // Additional data here
            },
          },
        });

        if (error) {
          // Handle error
          console.error("Error signing up:", error.message);
          errors.signUp = error.message;
        } else {
          // Handle success
          if (data.user.id.length > 0) {
            console.log("User signed up successfully:", data);
            toast.success("Check email for verification");
            formData.email = "";
            formData.password = "";
            formData.fullname = "";
          } else {
            toast.warning("Email exists");
          }
        }
      } catch (error) {
        console.error("Error signing up:", error.message);
        // errors.signUp = error.message;
      }
    }

    setFormErrors(errors);
    // }
  };

  // Remove error on focus
  const handleFocus = (e) => {
    const { name } = e.target;
    // Clear error message when input is focused
    setFormErrors({ ...formErrors, [name]: "" });
  };

  return (
    <div className="form">
      <main className="main">
        {/* <!-- Sign Up --> */}
        <section className="signUp">
          <div id="signUpContent" className="">
            <div className="details">
              <h1>Sign Up</h1>
              <form id="registrationForm" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />

                {formErrors.fullname ? (
                  <span className="error">{formErrors.fullname}</span>
                ) : (
                  <span className="error"> </span>
                )}

                <input
                  type="text"
                  placeholder="Email"
                  id="email"
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
                  id="password"
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

                {formErrors.errorr ? (
                  <span className="error">{formErrors.errorr}</span>
                ) : (
                  <span className="error"> </span>
                )}

                <input type="submit" value="Sign Up" className="button" />
                <p>
                  Already have an account?{" "}
                  <span className="logIn">
                    <NavLink to="/login" className="navlink">
                      Login
                    </NavLink>
                  </span>
                </p>
              </form>
            </div>

            {/* <p className="option">
              <span className="option-span">or sign up with</span>
            </p>

            <div className="icon">
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-apple"></i>
              <i className="fa-brands fa-linkedin-in"></i>
              <i className="fa-brands fa-facebook-f"></i>
            </div> */}
          </div>
        </section>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        draggable
        // pauseOnHover
        theme="dark"
        // transition:Bounce
      />
    </div>
  );
}

export default SignupForm;
