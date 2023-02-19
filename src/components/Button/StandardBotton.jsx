import React from "react";
import Classes from "./StandardButton.module.css"


const StandardButton = ({tag, onclick, type}) => {
    return(
        <button type={type} onClick={onclick} className={Classes.btn} >{tag}</button>
    )
}


export default StandardButton;