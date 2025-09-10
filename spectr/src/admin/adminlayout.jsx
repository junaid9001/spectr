import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./admcss/layout.css";
import { CiMenuFries } from "react-icons/ci";

export default function AdminLayout() {
  const [showside, setshowside] = useState(false);
  const navigate = useNavigate();
  function handlelogout() {
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <>
      <div className="admcontainer">
        <div className="menuicon" onClick={() => setshowside(!showside)}>
          <CiMenuFries size={30} />
        </div>
        <aside className={`admaside ${showside ? "active" : ""}`}>
          <h1 className="admlogo">
            SPECT<span className="admmirror">R</span>
          </h1>
          <nav>
            <ul>
              <li>
                {" "}
                <NavLink to={"/admin"} end>
                  Dashboard
                </NavLink>
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

        <main className="admmain" onClick={() => setshowside(false)}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
