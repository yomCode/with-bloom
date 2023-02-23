import { BsCurrencyExchange } from "react-icons/bs"
import { MdOutlineUpdate } from "react-icons/md"
import { TbFreeRights } from "react-icons/tb"
import Image from "./assets/images/hero.png"



export const heroInfo= 
    {
        title: "Stay Up-to-Date with the Latest",
        title2: "Crypto Exchange Rates",
        subtitle: "Prices and Trends in the World of Cryptocurrency.",
        buttonText: "Get started",
        image: <img src={Image} alt="#" />
    }

export const featuresTexts = [
    {
        title: "Easy to use",
        subtitle: "Easy onboarding process, Register and login to have access to our various services",
        icon: <TbFreeRights />,
    },
    {
        title: "Real-time data",
        subtitle: "Get real-time data on the latest prices and trends in the world of cryptocurrency",
        icon: <MdOutlineUpdate />,
    },
    {
        title: "Free Exchange calculator",
        subtitle: "Get the latest exchange rates for all major cryptocurrencies",
        icon: <BsCurrencyExchange />,
    }
]


export const supportedCoins = [
    "BTC", 
    "ETH", 
    "NGN", 
    "USD", 
    "BNB", 
    "BUSD", 
    "USDT", 
    "DASH", 
    "CUSD"
]



export const baseCurr = "BTC"

export const convertToCurr = "NGN";

