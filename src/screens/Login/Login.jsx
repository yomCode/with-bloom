import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useUserAuth } from "../../context/UserAuthContext";
import StandardButton from "../../components/Button/StandardBotton";
import GoogleButton from "react-google-button";
import { successNotification } from "../../components/Notification";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, googleLogin } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    } else if (!formData.password.length >= 6) {
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
    setLoading(true);
    if (validate()) {
      try {
        await login(formData.email, formData.password);
        navigate("/dashboard");
        successNotification("Login Successful");
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
    setLoading(false);
  };

  return (
    <div className="min-h-[100vh] w-[100vw] flex justify-center items-center">
            <div className=" flex flex-col justify-center items-center border-2 py-[1rem] h-[50vh] w-[90%] max-w-[30rem]">
                <h3 className="text-[white] text-[3rem] font-bold font-jost mb-[2rem] py-[2rem]" >Log In!</h3>
                <div className=" p-4 w-[100%] flex flex-col justify-center items-center gap-[2rem]">
              {error && (
              <div className=" bg-[#ed8989] p-3 rounded-sm">
                <h4>{error}</h4>
              </div>
            )}
            <form
              action=""
              onSubmit={handleSubmit}
              className="w-[100%] flex flex-col items-center gap-4"
            >
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
            {loading && <Loader />}

              <Link to="/reset-password">
                <p className="text-1xl hover:cursor-pointer">Forgot Password? </p>
              </Link>
          </div>

          <div className="justify-self-center self-center">
            <GoogleButton className="" onClick={handleGoogleLogin} />
          </div>
          <div className="mt-[2rem]">
          <p className="text-[white] text-1xl md:text-2xl">
            Dont have an account?{" "}
            <Link to="/signup" className="text-[#00aeff] text-1xl md:text-2xl">
              Signup
            </Link>
          </p>
        </div>
        </div>
        
        
      </div>
     
  );
};

export default Login;
