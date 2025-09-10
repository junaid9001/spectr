import React, { useContext } from "react";
import { Usercontext } from "./createcontext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./admcss/users.css";

export default function AdminUsers() {
  const { ucontext, setucontext } = useContext(Usercontext);
  const filtered = ucontext.filter((item) => item.role === "user");
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
    <div className="users">
      <h1 className="title">All Users</h1>

      
      <div className="user-header row">
        <span className="header-id">ID</span>
        <span className="header-username">Username</span>
        <span className="header-email">Email</span>
        <span className="header-view">View</span>
        <span className="header-status">Status</span>
      </div>

    
      <div className="user-list">
        {filtered.map((item) => (
          <div className="row" key={item.id}>
            <span className="id">{item.id}</span>
            <span className="username">{item.username}</span>
            <span className="email">{item.email}</span>
            <Link to={`/admin/userdetails/${item.id}`} className="link">
              View Info
            </Link>
            <button
              className={`status ${item.active ? "active" : "inactive"}`}
              onClick={() => handleactivity(item) }
              style={{color:"black"}}
            >
              {item.active ? "Active" : "Not Active"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
