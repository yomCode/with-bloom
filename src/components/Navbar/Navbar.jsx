import React, { useState } from "react";
import Classes from "./Navbar.module.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { Link } from "react-router-dom";

const Navbar = () => {

    const [menu, setMenu] = useState(true);



  return (
    <nav className={Classes.nav}>
        <div className={Classes.logo}>
          <a href="/">
            <h2 className={Classes.logo}>WithBloom</h2>
          </a>
        </div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">FAQ</a>
          </li>
        </ul>
        <div className={Classes.btn_link}>
          <a href="/signup" className={Classes.btn_signup}>Sign up</a>
          <a href="/login" className={Classes.btn_login}>Login</a>
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
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">FAQ</a>
              </li>
              <li>
                <a href="/">Login</a>
              </li>
              <li>
                <a href="/">Signup</a>
              </li>
            </ul>
          </div>
        )}
    </nav>
  );
};

export default Navbar;
