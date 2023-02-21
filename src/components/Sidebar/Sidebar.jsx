import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { GiCoins } from "react-icons/gi";
import { AiFillCalculator } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import Classes from "./Sidebar.module.css";
import { useUserAuth } from "../../context/UserAuthContext";



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
    ]

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const { logout } = useUserAuth();
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    const handleResize = () => {
        setScreenSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    const handleLogOut = async (e) => {
        e.preventDefault();
        try{
            await logout();
            navigate('/login')
        }catch(err){
            console.log(err.message);
        }
        
    }

    return(
        <div className={Classes.container}>
            {screenSize >= 1090 ? (
            <div style={{width: isOpen ? "300px" : "50px"}} className={Classes.sidebar}>
                <div className={Classes.top_section}>
                <div style={{display: isOpen ? "block" : "none"}} className={Classes.logo}>
                    <h2>WBloom</h2>
                </div>
                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className={Classes.bars}>
                    <AiOutlineMenu onClick={toggle} />
                </div>
                </div>
                
                <div className={Classes.menu}>
                        {menuItems.map((item, index) => (
                            <NavLink to={item.path} key={index} activeclassname={Classes.active} className={Classes.link}>
                                <div className={Classes.icon}>{item.icon}</div>
                                <div className={Classes.link_text}>{item.name}</div>
                            </ NavLink>
                        ))}
                        <NavLink onClick={handleLogOut} className={Classes.link}>
                            <div className={Classes.icon}>< RiLogoutBoxLine /></div>
                            <div className={Classes.link_text}><h4>Logout</h4></div>
                        </ NavLink>
                </div>
            </div> 
            ) : (
                <div className="w-[100%] bg-[white] ">
                    <nav>

                    </nav>
                </div>
                
            )}
                <main className={Classes.main}>
                    {children}
                </main>
        </div>
    )
}

export default Sidebar;