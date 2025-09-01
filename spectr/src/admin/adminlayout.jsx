import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import './admcss/layout.css'

export default function AdminLayout() {
  const navigate = useNavigate();
  function handlelogout() {
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <>
      <div className="admcontainer">
        <aside className="admaside">
          <nav>
            <h1 className="admlogo">
              SPECT<span className="admmirror">R</span>
            </h1>
            <ul>
              <li>
                {" "}
                <NavLink to={"/admin"}>Dashboard</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to={"users"}>Users</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to={"orders"}>Orders</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to={"manageproducts"}>Manage products</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to={"addnewproduct"}>Add new product</NavLink>
              </li>
            </ul>
          </nav>
          <button onClick={handlelogout} className="admlogout">
            Logout
          </button>
        </aside>

        <main className="admmain">
          <Outlet />
        </main>
      </div>
    </>
  );
}
