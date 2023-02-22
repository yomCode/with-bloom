import React from "react";
import Button from "../Button/Button";
import { heroInfo } from "../../constant";


const Hero = () => {
    return(
        <div data-testid="hero" className='w-[100vw] min-h-[80vh] flex flex-col md:flex-row-reverse items-center justify-center '>
            <div className='hidden md:block md:self-center md:justify-self-center md:basis-2/3'>
                {heroInfo.image}
            </div>
            
            <div className='w-[100%] flex flex-col  items-center justify-center md:justify-center md:items-start px-1 md:px-[2rem]'>
                <h1 className='text-[white] uppercase tracking-wide md:text-3xl font-bold mb-3 text-center md:text-left'> {heroInfo.title} <span className='text-[#00aeff]'>{heroInfo.title2}</span></h1>        
                <p className='text-[#ffffffb7] md:text-1xl mb-3 text-center md:text-left'>Your One-Stop Solution for Tracking Real-Time 
                    {heroInfo.subtitle}
                </p>
                
                <div className="mt-2 md:self-start">
                    <Button tag={heroInfo.buttonText} className='' />
                </div>
            </div>
        </div>
    )
}

export default Hero;