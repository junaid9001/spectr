import React, { useEffect, useState } from "react";
import axios from "axios";
import "./components/profile.css";
import Navbar from "./components/navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [state, setstate] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("user"));
  const user = userdata.id;
  useEffect(() => {
    axios
      .get(`http://localhost:4006/users?id=${user}`)
      .then((res) => setstate(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  const hi = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");

    axios.patch(`http://localhost:4006/users/${user}`, {
      cart: [],
      orders: [],
    });
    hi("/login");
  }

  return (
    <>
      <Navbar />
      <div className="profile">
        {state.map((item) => (
          <div key={item.id} className="profilecontainer">
            <h1 className="profiletitle">Profile</h1>

            <div className="profileinfo">
              <p>
                <strong>Username:</strong> {item.username}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              {item.role==="admin"&& <p><strong>Role: </strong>{item.role}</p>}
            </div>

            <h2 className="ordertitle">Recent Orders</h2>
            {item.orders && item.orders.length > 0 ? (
              <ul className="orderlist">
                {item.orders.map((order, index) => (
                  <li key={index} className="orderitem">
                    {order.name} × {order.quantity} = $
                    {order.price * order.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent orders found.</p>
            )}

            <button onClick={handleLogout} className="logoutbutton">
              Logout
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
