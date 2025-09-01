import React, { useContext } from "react";
import { Usercontext } from "./createcontext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminUsers() {
  const { ucontext, setucontext } = useContext(Usercontext);
  function handleactivity(item) {
    const target = ucontext.find((p) => p.id === item.id);
    axios
      .patch(`http://localhost:4006/users/${target.id}`, {
        active: !target.active,
      })
      .then(() => axios.get("http://localhost:4006/users"))
      .then((res) => setucontext(res.data));
  }
  
  return (
    <>
      <h1>all users</h1>
      {ucontext.map((item) => (
        <p key={item.id}>
          {item.username} - {item.password} - {item.email}
          <Link to={`/admin/userdetails/${item.id}`}>view all info</Link>
            -  - <button onClick={()=>handleactivity(item)}>{item.active?(<p>active</p>):(<p>not active</p>)}</button>
          
        </p>
        
      ))}
    </>
  );
}
