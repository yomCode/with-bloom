import React from "react";
import FeatureCard from "./FeatureCard";
import Classes from "./Features.module.css"
import { TbFreeRights } from "react-icons/tb"
import { MdOutlineUpdate } from "react-icons/md"
import { BsCurrencyExchange } from "react-icons/bs"


const Features = () =>{
    return(
        <div className={Classes.container}>
            <FeatureCard icon={<TbFreeRights />} heading="Easy to use" text="Easy onboarding process, Register and login to have access to our various services" />
            <FeatureCard icon={<MdOutlineUpdate />} heading="Stay up-to-date" text="Stay up to date on the price of various  coins, 24/7 live update of coins prices" />
            <FeatureCard icon={<BsCurrencyExchange />} heading="Free Exchange calculator" text="Use our exchange rate feature to convert coin rate from on cryptocurrency to another in 2 easy steps" />
        </div>
    )
}


export default Features;