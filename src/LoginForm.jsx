import "./Form.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";

// Toasts
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

function Form({ token, setToken, handleToast, handleLogin }) {
  let navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState("Log In");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  const validateForm = async () => {
    // let isValid = true;
    // const errors = {};

    // // Validate email
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //   errors.email = "Invalid Email";
    //   isValid = false;
    // }

    // // Validate password
    // if (formData.password.length < 6) {
    //   errors.password = "Password must be at least 6 characters";
    //   isValid = false;
    // }

    // setFormErrors(errors);

    // if (isValid) {
    try {
      const { data, session, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // Handle error
        // console.error("Error logging in:", error.message);

        error.errorr = "email or password incorrect";
        toast.error("User does not exist");
      } else {
        // Handle success
        // console.log("Login successful!:", data);

        setToken(data);
        setValue("Logging In...");
        sessionStorage.setItem("token", JSON.stringify(data));
        // toast.success("Login successful");
        handleLogin();

        navigate("/portfolio");
      }
    } catch (error) {
      // console.error("Error logging in:", error.message);
      // errors.signUp = error.message;
      console.log(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleClick = () => {
    // Toggle the clicked state
    setClicked(true);
    // After 1 second, revert back to original color
    setTimeout(() => {
      setClicked(false);
    }, 100);
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
        {/* <!-- Login --> */}
        <section className="logIn">
          <div id="loginContent">
            <div className="details">
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

                {/* {formErrors.errorr ? (
                  <span className="error">{formErrors.errorr}</span>
                ) : (
                  <span className="error"> </span>
                )} */}

                <p>Forgotten Password?</p>
                <input
                  type="submit"
                  value={value}
                  className={`button ${clicked ? "clicked" : ""}`}
                  onClick={handleClick}
                />

                <p>
                  Don't have an account?{" "}
                  <span className="signUp">
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

export default Form;
