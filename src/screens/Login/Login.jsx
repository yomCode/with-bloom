import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useUserAuth } from "../../context/UserAuthContext";
import Classes from "./Login.module.css";
import StandardButton from "../../components/Button/StandardBotton";
import GoogleButton from "react-google-button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, googleLogin, resetPassword } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let isValid = true;
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!regex.test(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }else if(!formData.password.length >= 6){
        errors.password = "Password must be at least 6 characters";
        isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await googleLogin();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validate()) {
      try {
        await login(formData.email, formData.password);
        navigate("/dashboard");
      } catch (err) {
        switch (err.code) {
          case "auth/user-not-found":
            setError("User not found. Please sign up.");
            break;
          case "auth/wrong-password":
            setError("Invalid email or password.");
            break;
          default:
            setError(err.message);
            break;
        }
      }
    }
  };

  return (
    <div className={Classes.container}>
      <div className={Classes.form_wrapper}>
        <h3 className={Classes.form_header}>Log In!</h3>
        <div className={Classes.form_primary}>
          <div className={Classes.form_group}>
            {error && (
              <div className={Classes.error}>
                <h4>{error}</h4>
              </div>
            )}
            <form action="" onSubmit={handleSubmit}>
              <Input
                name="email"
                placeholder="Enter your email address"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                name="password"
                placeholder="Enter your password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <StandardButton type="submit" tag="Login" />
            </form>

            <div className={Classes.supports}>
              <Link to="/reset-password"><p>Forgot Password? </p></Link>
                            
                        </div>
                    </div>
                    <div className={Classes.divider}>
                        <span><p>OR</p></span>
                    </div>
                    
                    <div className={Classes.form_secondary}>
                        <GoogleButton className={Classes.google} onClick={handleGoogleLogin} /> 
                    </div>
                </div>
                <div className={Classes.signup_btn}>
                    <p>Dont have an account? <Link to="/signup" className={Classes.signup_route}>Signup</Link></p>
                </div>
            </div>
        </div>
    )
}


export default Login;