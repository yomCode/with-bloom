import React from 'react';
import Classes from './Button.module.css';


const Button = ({tag, onclick, type}) => {
    return(
        <button type={type} onClick={onclick} className={Classes.btn} >{tag}</button>
    )
}


export default Button;