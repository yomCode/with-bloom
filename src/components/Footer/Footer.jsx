import React from "react";
import Classes from "./Footer.module.css";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";


const Footer = () => {
return(
    <footer className={Classes.container}>
        <div className={Classes.icons}>
        < BsInstagram />
        < BsTwitter />
        < FaTelegramPlane />
        < FiFacebook />
        </div>
        <div>
            <p>Copyright 2023</p>
        </div>
    </footer>
)
}

export default Footer;