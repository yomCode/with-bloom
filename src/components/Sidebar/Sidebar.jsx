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
       }
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
       <div className={screenSize >= 1200 && 'flex min-h-[100vh]'}>
           {screenSize >= 1200 ? (
               <div style={{width: isOpen ? "200px" : "90px"}} className={Classes.sidebar}>
                   <div className='flex justify-between items-center p-2 mb-[2rem]'>
                        <div style={{display: isOpen ? "block" : "none"}} className={Classes.logo}>
                            <h2 className="text-[1.5rem] ">WBloom</h2>
                        </div>
                        <div style={{marginLeft: isOpen ? "50px" : "20px"}} className={Classes.bars}>
                            <AiOutlineMenu onClick={toggle} />
                        </div>
                   </div>
                  
                   <div className='flex flex-col gap-[1rem]' style={{alignItems: isOpen? "start" : "center"}}>
                       {menuItems.map((item, index) => (
                           <NavLink to={item.path} key={index} activeclassname={Classes.active} className={Classes.link}>
                               <div className={Classes.icon}>{item.icon}</div>
                               <div style={{display: isOpen? "block" : "none"}} className={`${Classes.link_text} whitespace-nowrap`}>{item.name}</div>
                           </ NavLink>
                       ))}
                       <NavLink onClick={handleLogOut} className={Classes.link} style={{}}>
                           <div className={Classes.icon}>< RiLogoutBoxLine /></div>
                           <div style={{display: isOpen? "block" : "none"}} className={Classes.link_text}><h4>Logout</h4></div>
                       </ NavLink>
                   </div>
               </div>
           ) : (
               <div className="py-5 bg-[white] w-[100vw]">
                   <nav className="flex justify-between items-center px-5">
                       <ul className="flex justify-between align-center text-[1rem]">
                       {menuItems.map((item, index) => (
                           <NavLink to={item.path} key={index} activeclassname={Classes.active} className={Classes.link}>
                               <div className='text-[1rem] mx-2'>{item.name}</div>
                           </ NavLink>
                       ))}
                       </ul>
                       <NavLink onClick={handleLogOut}>
                           <div className={Classes.icon}>< RiLogoutBoxLine /></div>
                       </ NavLink>
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

