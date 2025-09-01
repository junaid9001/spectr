import React from "react";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

import "./navbar.css";
export default function Navbar() {
  const user=JSON.parse(localStorage.getItem("user"))



  return (
    <>
    <div className="navbar">
      <nav>
        <div className="navleft">

          <NavLink to='/'>HOME</NavLink>
          <NavLink to='/store'>STORE</NavLink>
          <NavLink to='/about'>ABOUT</NavLink>
 
        </div>

        <div className="navcenter">

          <h1 className="logo">SPECT<span className="mirror">R</span></h1>

        </div>

        <div className="navright">
         {user&&<NavLink to='/profile'><CiUser></CiUser></NavLink>} 
          <NavLink to='/cart'><CiShoppingCart></CiShoppingCart></NavLink>
          {!user?<NavLink to='/login'>LOGIN</NavLink>:null}

         
          

        </div>
      </nav>
    </div>

    <div className="navbar2">
      
    </div>
    </>
  );
}
