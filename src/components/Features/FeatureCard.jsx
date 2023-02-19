import React from "react";
import Classes from "./FeatureCard.module.css"
import { GoPrimitiveDot } from "react-icons/go"


const FeatureCard = ({icon, heading, text}) => {
    return(
        <div className={Classes.container}>
            <h6 className={Classes.icon}>{icon}</h6>
            <h6 className={Classes.divide}><GoPrimitiveDot /></h6>
            <div className={Classes.details}>
                <h6 className={Classes.heading}>{heading}</h6>
                <p className={Classes.text}>{text}</p>
            </div>
        </div>
    )
}


export default FeatureCard;