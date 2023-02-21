import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { useUserAuth } from "../../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import StandardButton from "../../components/Button/StandardBotton";
import {
    successNotification,
  } from "../../components/Notification";



const Signup = () => {
    const{ signup } = useUserAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
           setLoading(true);
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
            setLoading(false);
        }
        
    }

    return(
        <div className="min-h-[100vh] w-[100vw] flex justify-center items-center">
            <div className=" flex flex-col justify-center items-center border-2 py-[1rem] w-[90%] max-w-[30rem]">
                <h3 className="text-[white] text-[3rem] font-bold font-jost mb-[2rem] py-[2rem]" >Sign Up</h3>
                <div className=" p-4 w-[100%] flex flex-col gap-[2rem]">
                        {error && <div className=" rounded-sm text-center text-[black] border w-[80%] self-center bg-[#ffa3a3]" ><h4>{error}</h4></div>}
                        <form action="" onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4 md:w-[100%]'>
                            <Input name="email" placeholder="Enter your email address" type="email" label="Email" value={formData.email} onChange={handleChange} error={errors.email} />
                            <Input name="password" placeholder="Enter your password" type="password" label="Password" value={formData.password} onChange={handleChange} error={errors.password}  />
                            <Input name="confirmPassword" placeholder="Confirm password" type="password" label="Confirm Password" value={formData.confirmPassword} onchange={handleChange} error={errors.confirmPassword}  />
                            <StandardButton type="submit" tag="Create Account" />
                        </form>
                        {loading && <Loader />}
                        <div className="md:w-[100%] justify-self-center text-center">
                            <p className="text-[1rem] text-[white]">Already have an account? <Link to="/login" className="text-[#00aeff]" >Login</Link></p>
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export default Signup;