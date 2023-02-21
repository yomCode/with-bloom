import React from "react";
import FeatureCard from "./FeatureCard";
import { TbFreeRights } from "react-icons/tb"
import { MdOutlineUpdate } from "react-icons/md"
import { BsCurrencyExchange } from "react-icons/bs"


const Features = () =>{
    return(
        <div className="flex justify-center w-[100vw] bg-blue">
            <div className='flex flex-col md:flex-row md:flex-wrap md:w-[80%] items-center md:justify-center md:items-center gap-[4rem] md:gap-[2rem] py-4'>
                <FeatureCard icon={<TbFreeRights />} heading="Easy to use" text="Easy onboarding process, Register and login to have access to our various services" />
                <FeatureCard icon={<MdOutlineUpdate />} heading="Stay up-to-date" text="Stay up to date on the price of various  coins, 24/7 live update of coins prices" />
                <FeatureCard icon={<BsCurrencyExchange />} heading="Free Exchange calculator" text="Use our exchange rate feature to convert coin rate from on cryptocurrency to another in 2 easy steps" />
             </div>
        </div>
        
    )
}


export default Features;