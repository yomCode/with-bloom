import React from "react";
import Button from "../Button/Button";
// import Classes from "./Hero.module.css";
import Image from "../../../src/assets/images/hero.png";


const Hero = () => {
    return(
        <div className='w-[100vw] min-h-[80vh] flex flex-col items-center justify-center'>
            <div className=''>
                <img src={Image} alt="img" className="hidden"  />
            </div>
            
            <div className='w-[100%] flex flex-col items-center justify-center '>
                <h1 className='text-[white] uppercase tracking-wide font-bold mb-3 text-center'>Stay Up-to-Date with the Latest <span className='text-[#00aeff]'>Crypto Exchange Rates</span></h1>        
                <p className='text-[#ffffffb7] mb-3 text-center'>Your One-Stop Solution for Tracking Real-Time 
                    Prices and Trends in the World of Cryptocurrency.
                </p>
                
                <div className="mt-2">
                    <Button tag="Get started" className='' />
                </div>
            </div>
        </div>
    )
}

export default Hero;