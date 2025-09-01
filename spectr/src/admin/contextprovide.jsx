import React, { useEffect, useState } from "react";
import axios from "axios";
import { Productcontext, Usercontext,Wishlistcontext } from "./createcontext";

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


  return (
    <Wishlistcontext.Provider value={{ wcontext, setwcontext }}>
      {children}
    </Wishlistcontext.Provider>
  );
}
