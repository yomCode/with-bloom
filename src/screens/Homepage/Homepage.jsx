import React from "react";
import Hero from "../../components/Hero/Hero.jsx"
import Features from "../../components/Features/Features";

const Homepage = () => {

    return(
        <div>
            <Hero data-testid="hero" />
            <Features data-testid="features" />
        </div>
    )
}

export default Homepage;