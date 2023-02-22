import React from "react";
import FeatureCard from "./FeatureCard";
import {featuresTexts} from "../../constant";

const Features = () => {
    return (
      <div
        className="flex justify-center w-[100vw] bg-blue"
        role="region"
        aria-label="Features"
      >
        <div className='flex flex-col md:flex-row md:flex-wrap md:w-[80%] items-center md:justify-center md:items-start gap-[4rem] md:gap-[2rem] py-4'>
        {
            featuresTexts.map((featureTexts, index) => {
                return (
                    <FeatureCard
                        icon={featureTexts.icon}
                        heading={featureTexts.title}
                        text={featureTexts.subtitle}
                        key={index}
                        
                    />
                )
            })
        }
        </div>
      </div>
    )
  }
  


export default Features;