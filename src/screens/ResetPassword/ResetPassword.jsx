import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useUserAuth } from "../../context/UserAuthContext";
import Classes from "./ResetPassword.module.css";
import StandardButton from "../../components/Button/StandardBotton";




const ResetPassword = () => {

    const [formData, setFormData] = useState({
        email: "",
    });
    const { resetPassword } = useUserAuth();
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({
        email: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setErrors({ ...errors, [e.target.name]: "" });
    };
    const validate = () => {
        let isValid = true;
        const errors = {};
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(!formData.email){
            errors.email = "Email is required";
            isValid = false;
        }else if(!regex.test(formData.email)){
            errors.email = "Invalid email address";
            isValid = false;
        }
        setErrors(errors);
        return isValid;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
            try {
                await resetPassword(formData.email);
                navigate("/login");
            } catch (err) {
                setError(err.message);
            }
        }
    };



    return (
        <div className={Classes.resetPassword}>
            <div className={Classes.resetPassword_container}>
                <h1>Reset Password</h1>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="email"
                        placeholder="Enter your email address"
                        type="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <StandardButton type="submit" tag="Reset Password" onclick={handleSubmit} />
                </form>
            


            </div>
        </div>
    )
}

export default ResetPassword