import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { GiCoins } from "react-icons/gi";
import { AiFillCalculator } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Classes from "./Sidebar.module.css";



const Sidebar = ({ children }) => {
    const menuItems = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <RxDashboard />
        },
        {
            path: "/coins",
            name: "Coins",
            icon: <GiCoins />
        },
        {
            path: "/exchange-rate",
            name: "Exchange Rate",
            icon: <AiFillCalculator />
        },
        {
            path: "/login",
            name: "Logout",
            icon: <RiLogoutBoxLine />
        }
    ]

    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <div className={Classes.container}>
            <div style={{width: isOpen ? "300px" : "60px"}} className={Classes.sidebar}>
                <div className={Classes.top_section}>
                <div style={{display: isOpen ? "block" : "none"}} className={Classes.logo}>
                    <h2>WithBloom</h2>
                </div>
                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className={Classes.bars}>
                    <AiOutlineMenu onClick={toggle} />
                </div>
                </div>
                
                <div className={Classes.menu}>
                        {menuItems.map((item, index) => (
                            <NavLink to={item.path} key={index} activeClassName={Classes.active} className={Classes.link}>
                                <div className={Classes.icon}>{item.icon}</div>
                                <div className={Classes.link_text}>{item.name}</div>
                            </ NavLink>
                        ))}
                    </div>
                </div> 
                <main className={Classes.main}>
                    {children}
                </main>
        </div>
    )
}

export default Sidebar;