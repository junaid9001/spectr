import React from "react";
import { useContext, useState } from "react";
import { Wishlistcontext, Cartcontext } from "../admin/createcontext";
import { NavLink } from "react-router-dom";
import { CiUser, CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";

import "./navbar.css";
export default function Navbar() {
  const { wcontext } = useContext(Wishlistcontext);
  const { ccontext } = useContext(Cartcontext);
  const cart = ccontext ? ccontext.length : 0;
  const wishlist = wcontext ? wcontext.length : 0;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="navbar">
        <nav>
          <div className="navleft">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/store">STORE</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
          </div>

          <div className="navcenter">
            <h1 className="logo">
              SPECT<span className="mirror">R</span>
            </h1>
          </div>

          <div className="navright">
            {user && (
              <NavLink to="/profile">
                <CiUser></CiUser>
              </NavLink>
            )}

            <NavLink to="/wishlist">
              <CiHeart />
              {wishlist > 0 && (
                <span className="wishlist-count" style={{ fontSize: "small" }}>
                  {wishlist}
                </span>
              )}
            </NavLink>

            <NavLink to="/cart">
              <CiShoppingCart />
              {cart > 0 && (
                <span className="cart-count" style={{ fontSize: "small" }}>
                  {cart}
                </span>
              )}
            </NavLink>
            {!user ? <NavLink to="/login">LOGIN</NavLink> : null}
          </div>
        </nav>
      </div>

      <div className="navbar2">
        <Navbar2 />
      </div>
    </>
  );
}

function Navbar2() {
  const { wcontext } = useContext(Wishlistcontext);
  const { ccontext } = useContext(Cartcontext);
  const [open, setopen] = useState(false);
  const cart = ccontext ? ccontext.length : 0;
  const wishlist = wcontext ? wcontext.length : 0;

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="nav2top">
        <button
          className="nav2menu"
          onClick={() => setopen(!open)}
          aria-label="menu"
          aria-expanded={open}
        >
          <CiMenuFries size={26} />
        </button>

        <h1 className="nav2logo">
          SPECT<span className="mirror">R</span>
        </h1>

        <div className="nav2icons">
          <NavLink to="/wishlist" onClick={() => setopen(false)}>
            <CiHeart size={22} />
            {wishlist > 0 && <span className="wishlistcount">{wishlist}</span>}
          </NavLink>
          <NavLink to="/cart" onClick={() => setopen(false)}>
            <CiShoppingCart size={22} />
            {cart > 0 && <span className="cartcount">{cart}</span>}
          </NavLink>
        </div>
      </div>

      <div className={`nav2panel ${open ? "show" : ""}`}>
        <NavLink to="/" onClick={() => setopen(false)}>
          HOME
        </NavLink>
        <NavLink to="/store" onClick={() => setopen(false)}>
          STORE
        </NavLink>
        <NavLink to="/about" onClick={() => setopen(false)}>
          ABOUT
        </NavLink>

        {user && (
          <NavLink to="/profile" onClick={() => setopen(false)}>
            <CiUser /> PROFILE
          </NavLink>
        )}
        {!user && (
          <NavLink to="/login" onClick={() => setopen(false)}>
            LOGIN
          </NavLink>
        )}
      </div>
    </>
  );
}
