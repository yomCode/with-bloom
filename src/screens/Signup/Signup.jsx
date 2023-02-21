import React, { useState } from "react";
import Input from "../../components/Input/Input";
// import Classes from "./Signup.module.css"
import { useUserAuth } from "../../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import StandardButton from "../../components/Button/StandardBotton";
import {
    successNotification,
  } from "../../components/Notification";



const Signup = () => {
    const{ signup } = useUserAuth();
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
      });
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        // setErrors({ ...errors, [e.target.name]: "" });
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

        if (!formData.confirmPassword) {
            errors.confirmPassword = "Password confirmation is required";
            isValid = false;
          }else if(!formData.password === formData.confirmPassword){
              setError("Passwords do not match");
          }
    
        setErrors(errors);
        return isValid;
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        if(!validate()){
           
            try{
                await signup(formData.email, formData.password);
                navigate('/login')
                successNotification("Account created successfully. Please sign in.");
            }catch(err){
                switch (err.code) {
                    case "auth/email-already-in-use":
                    setError("Email already in use. Please sign in.");
                    break;
                    case "auth/weak-password":
                    setError("Password must be at least 6 characters.");
                    break;
                    case "auth/invalid-email":
                        setError("Invalid email address. ");
                        break;
                    default:
                    setError("An error occurred. Please try again later.");
                    break;
                }
            }
        }
        
    }

    return(
        <div className="min-h-[100vh] w-[100vw] flex justify-center items-center">
            <div className=" flex flex-col justify-center items-center border-2 py-[1rem]">
                <h3 className="text-[white] text-2xl" >Sign Up</h3>
                <div className=" max-w-[70%] p-[1rem] ">
                        {error && <div className=" text-[white] rounded-sm text-center " ><h4>{error}</h4></div>}
                        <form action="" onSubmit={handleSubmit}>
                            <Input name="email" placeholder="Enter your email address" type="email" label="Email" value={formData.email} onchange={handleChange} error={errors.email} />
                            <Input name="password" placeholder="Enter your password" type="password" label="Password" value={formData.password} onchange={handleChange} error={errors.password}  />
                            <Input name="confirmPassword" placeholder="Confirm password" type="password" label="Confirm Password" value={formData.confirmPassword} onchange={handleChange} error={errors.confirmPassword}  />
                            <StandardButton type="submit" tag="Create Account" />
                        </form>
                        <div className="mt-[1rem]">
                            <p className="text-[1rem]">Already have an account? <Link to="/login" >Login</Link></p>
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export default Signup;