import React from "react";
import Classes from "./Input.module.css";


const Input = ({type, placeholder, name, label, onchange, value}) => {

    return(
        <div className={Classes.container}>
            <label htmlFor={name}>{label}</label>
            <input type={type} placeholder={placeholder} name={name} value={value} onChange={onchange} />
        </div>
    )

}

export default Input;