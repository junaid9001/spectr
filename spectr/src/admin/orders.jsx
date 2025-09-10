import React, { useContext } from "react";
import { Usercontext } from "./createcontext";
import "./admcss/orders.css";

export default function AdminOrders() {
  const { ucontext } = useContext(Usercontext);

  return (
<div className="orders-container">
  <h2 className="ordertitle">All Users Orders</h2>

  <table className="orders-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>User</th>
        <th>Email</th>
        <th>Address</th>
        <th style={{textAlign:"center"}}>Items</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {ucontext.flatMap((user) =>
        user.orders?.map((order, index) => (
          <tr key={index}>
            <td>{index + 1000}</td>
            <td>{order.addressdetail.name}</td>
            <td>{user.email}</td>
            <td style={{fontSize:"small"}}>
              name: {order.addressdetail?.name}
              <br />
              address :{order.addressdetail?.address}
            </td>
            <td>
              {order.items.map((item, i) => (
                <div key={i} style={{fontSize:"small",textAlign:"center",fontWeight:"bold"}}>
                  {item.name} × {item.quantity}
                </div>
              ))}
            </td>
            <td>
              ₹
              {order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

  );
}
