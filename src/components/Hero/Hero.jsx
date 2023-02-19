import React from "react";
import Button from "../Button/Button";
import Classes from "./Hero.module.css";
import Image from "../../../src/assets/images/hero.png";


const Hero = () => {
    return(
        <div className={Classes.container}>
            <div className={Classes.hero_img}>
                <img src={Image} alt="img" />
            </div>
            
            <div className={Classes.hero_text}>
                <h1 className={Classes.hero_text_primary}>Stay Up-to-Date with the Latest <span className={Classes.hero_text_primary_inner}>Crypto Exchange Rates</span></h1>
                <p className={Classes.hero_text_secondary}>Your One-Stop Solution for Tracking Real-Time 
                    Prices and Trends in the World of Cryptocurrency.</p>
                <div>
                    <Button tag="Get started" className={Classes.get_started} />
                </div>
            </div>
        </div>
    )
}

export default Hero;