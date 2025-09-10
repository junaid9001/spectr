import React, { useContext, useEffect, useState } from "react";
import { Productcontext, Usercontext } from "./createcontext";
import AdminManageproduct from "./manageproduct";
import { FaBoxOpen, FaUserFriends, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";
import "./admcss/dashboard.css";

export default function AdminDashboard() {
  const { pcontext } = useContext(Productcontext);
  const { ucontext } = useContext(Usercontext);
  const totalproducts = pcontext.length;
  const totalusers = ucontext.length;
  const [total, settotal] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4006/total")
      .then((res) => settotal(res.data[0]));
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <FaBoxOpen className="dashboard-icon" />
          <h2>{totalproducts + 10}</h2>
          <p>Total Products</p>
        </div>

        <div className="dashboard-card">
          <FaUserFriends className="dashboard-icon" />
          <h2>{totalusers + 588}</h2>
          <p>Total Users</p>
        </div>

        <div className="dashboard-card">
          <FaMoneyBillWave className="dashboard-icon" />
          <h2>
            {Math.floor(total.totalsales / 85 / 100000000)}
            B$
          </h2>
          <p>Total Sales</p>
        </div>
      </div>
    </div>
  );
}
