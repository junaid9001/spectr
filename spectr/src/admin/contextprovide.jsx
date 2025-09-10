import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Productcontext,
  Usercontext,
  Wishlistcontext,
  Cartcontext,
} from "./createcontext";

export function Productprovider({ children }) {
  const [pcontext, setpcontext] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4006/products")
      .then((res) => setpcontext(res.data));
  }, []);
  return (
    <Productcontext.Provider value={{ pcontext, setpcontext }}>
      {children}
    </Productcontext.Provider>
  );
}

export function Userprovider({ children }) {
  const [ucontext, setucontext] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4006/users")
      .then((res) => setucontext(res.data));
  }, []);
  return (
    <Usercontext.Provider value={{ ucontext, setucontext }}>
      {children}
    </Usercontext.Provider>
  );
}

export function Wishlistprovider({ children }) {
  const [wcontext, setwcontext] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = user?user.wishlist:null;
    setwcontext(cart);
  }, []);

  return (
    <Wishlistcontext.Provider value={{ wcontext, setwcontext }}>
      {children}
    </Wishlistcontext.Provider>
  );
}

export function Cartprovider({ children }) {
  const [ccontext, setccontext] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = user?user.cart:null;
    setccontext(cart);
  }, []);

  return (
    <Cartcontext.Provider value={{ ccontext, setccontext }}>
      {children}
    </Cartcontext.Provider>
  );
}
