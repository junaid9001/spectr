import React, { useContext } from "react";
import { Productcontext, Usercontext } from "./createcontext";
import AdminManageproduct from "./manageproduct";
import axios from "axios";

export default function AdminDashboard() {
  const { pcontext } = useContext(Productcontext);
  const { ucontext } = useContext(Usercontext);


  return (
    <div>
      hello
      {/*{pcontext.map((item) => (
        <p key={item.id}>
          {item.name} x {item.price} - {item.brand}
          <br></br> - {item.description}
        </p>
      ))}
      <br></br>
      {ucontext.map((item) => (
        <p key={item.id}>
          {}
          {item.name} x {item.email} - {item.password}
          <br></br> - {item.role}
        </p>
      ))}*/}
    
      
    </div>
  );
}
