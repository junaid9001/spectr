import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./admcss/userdetail.css";

export default function Userdetails() {
  const [detail, setdetail] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4006/users/${id}`)
      .then((res) => setdetail(res.data));
  }, []);

  return (
    <div className="userdetail">
      <div className="section">
        <h1 className="title">User Details</h1>
        <p>
          <strong>Username:</strong> {detail.username}
        </p>
        <p>
          <strong>Email:</strong> {detail.email}
        </p>
        <p>
          <strong>Role:</strong> {detail.role}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={detail.active ? "active" : "inactive"}>
            {detail.active ? "Active" : "Not Active"}
          </span>
        </p>
      </div>

      <div className="section">
        <h2 className="subtitle">Wishlist</h2>
        {detail.wishlist && detail.wishlist.length > 0 ? (
          <div className="grid">
            {detail.wishlist.map((w, i) => (
              <div key={i} className="card">
                <div>
                  <h3 className="name">{w.name}</h3>
                  {w.price && <p className="price">₹{w.price}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty">No wishlist items</p>
        )}
      </div>

      <div className="section">
        <h2 className="subtitle">Orders</h2>
        {detail.orders && detail.orders.length > 0 ? (
          <div className="grid">
            {detail.orders.map((order, i) => (
              <div key={i} className="card">
                <h3 className="name">Order #{i + 1}</h3>

                <div className="order-items">
                  {order.items.map((item, j) => (
                    <p key={j}>
                      {item.name} × {item.quantity} = ₹
                      {item.price * item.quantity}
                    </p>
                  ))}
                </div>
                <p className="total">
                  <strong>
                    Total: ₹
                    {order.items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}
                  </strong>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty">No orders placed</p>
        )}
      </div>
    </div>
  );
}
