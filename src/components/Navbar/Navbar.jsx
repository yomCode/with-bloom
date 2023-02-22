import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useUserAuth } from "../../context/UserAuthContext";
import Logo from "../../assets/logo/logo2.png";
import Classes from "./Navbar.module.css";




const Navbar = () => {


   const [menu, setMenu] = useState(true);
   const {user} = useUserAuth();
   const [navbar, setNavbar] = useState(false);


   const changeBackground = () => {
       if(window.scrollY >= 60){
           setNavbar(true);
       }else{
           setNavbar(false);
       }
   }


   window.addEventListener('scroll', changeBackground);


   if(user){
     return null;
   }
 return (


    <nav className={navbar ? [Classes.nav, Classes.active].join(' ') : Classes.nav}>
     <div className={Classes.navContainer}>
       <div className={Classes.logo}>
           <Link to="/">
             <img src={Logo} alt="#" className={Classes.logoImage} />
           </Link>
         </div>
         <ul>
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/">About</Link>
           </li>
           <li>
             <Link to="/">FAQ</Link>
           </li>
         </ul>
         <div className={Classes.btn_link}>
           <Link to="/signup" className={Classes.btn_signup}>Sign up</Link>
           <Link to="/login" className={Classes.btn_login}>Login</Link>
         </div>
         {menu ? (
           <AiOutlineMenu
             className={Classes.icon}
             onClick={() => setMenu(!menu)}
           />
         ) : (
           <AiOutlineClose
             className={Classes.icon}
             onClick={() => setMenu(!menu)}
           />
         )}
         {!menu && (
           <div className={Classes.mobile_menu}>
             <ul>
               <li>
                 <Link to="/">Home</Link>
               </li>
               <li>
                 <Link to="/">About</Link>
               </li>
               <li>
                 <Link to="/">FAQ</Link>
               </li>
               <li>
                 <Link to="/login">Login</Link>
               </li>                 
               <li>
                 <Link to="/signup">Signup</Link>
               </li>
             </ul>
           </div>
         )}
     </div>
      
   </nav>
 );
};


export default Navbar;





