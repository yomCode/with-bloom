import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Classes from "./Signup.module.css"
import { useUserAuth } from "../../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import StandardButton from "../../components/Button/StandardBotton";
import Google from "../../assets/logo/google.svg";



const Signup = () => {
    const{ signup } = useUserAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (e) => {
        const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");
        try{
            await signup(formData.email, formData.password);
            navigate('/login')
        }catch(err){
            setError(err.message);
        }
    }

    return(
        <div className={Classes.container}>
            <div className={Classes.form_wrapper}>
                <h3 className={Classes.form_header} >Sign Up</h3>
                <div className={Classes.form_primary}>
                    <div className={Classes.form_group}>
                        {error && <div className={Classes.error}><h4>{error}</h4></div>}
                        <form action="" onSubmit={handleSubmit}>
                            <Input name="email" placeholder="Enter your email address" type="email" label="Email" value={formData.email} onchange={handleChange}  />
                            <Input name="password" placeholder="Enter your password" type="password" label="Password" value={formData.password} onchange={handleChange}  />
                            <Input name="confirmPassword" placeholder="Confirm password" type="password" label="Confirm Password" value={formData.confirmPassword} onchange={handleChange}  />
                            <StandardButton type="submit" tag="Create Account" />
                        </form>
                    </div>
                    <div className={Classes.divider}>
                        <span><p>OR</p></span>
                    </div>
                    
                    <div className={Classes.form_secondary}>
                        <div className={Classes.google}><img src={Google} alt="" /> <h6>Continue with Google </h6></div>
                    </div>
                </div>
                <div className={Classes.signup_btn}>
                    <p>Alreay have an account? <Link to="/login" className={Classes.login_route}>Signup</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;