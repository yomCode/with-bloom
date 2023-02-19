import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { useUserAuth } from "../../context/UserAuthContext";
import Classes from "./Login.module.css";
import Google from "../../assets/logo/google.svg";
import StandardButton from "../../components/Button/StandardBotton";


const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const { login } = useUserAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await login(formData.email, formData.password);
            navigate('/dashboard')
        }catch(err){
            setError(err.message);
        }
        
    }


    return(
        <div className={Classes.container}>
            <div className={Classes.form_wrapper}>
                <h3 className={Classes.form_header} >Log In!</h3>
                <div className={Classes.form_primary}>
                    <div className={Classes.form_group}>
                        {error && <div className={Classes.error}><h4>{error}</h4></div>}
                        <form action="" onSubmit={handleSubmit}>
                            <Input name="email" placeholder="Enter your email address" type="email" label="Email" value={formData.email} onchange={handleChange}  />
                            <Input name="password" placeholder="Enter your password" type="password" label="Password" value={formData.password} onchange={handleChange}  />
                            <StandardButton type="submit" tag="Login" />
                        </form>

                        <div className={Classes.supports}>
                            <p>Forgot Password? </p>
                            
                        </div>
                    </div>
                    <div className={Classes.divider}>
                        <span><p>OR</p></span>
                    </div>
                    
                    <div className={Classes.form_secondary}>
                        <div className={Classes.google}><img src={Google} alt="" /> <h6>Log In with Google </h6></div>
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