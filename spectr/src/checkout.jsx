import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./components/checkout.css";
import { useState } from "react";

export default function Checkout() {
  const [address, setaddress] = useState("");
  const [card, setcard] = useState("");
  const [name, setname] = useState("");
  const [error, seterror] = useState("");
  const location = useLocation();
  const { cartitem, total } = location.state || { cartitem: [], total: 0 };
  const navigate = useNavigate();

  function handlebuy() {
    if (address.length > 1 && card.length > 1 && name.length > 1) {
      const user = JSON.parse(localStorage.getItem("user"));
      const addressdetail = {
          name ,address,card
      };

      const updatedorders = [
        ...(user.orders || []),
        {
          items: [...cartitem],
          addressdetail: addressdetail,
        },
      ];

      const clearcart = { ...user, cart: [], orders: updatedorders };

      localStorage.setItem("user", JSON.stringify(clearcart));

      axios
        .patch(`http://localhost:4006/users/${user.id}`, {
          cart: [],
          orders: updatedorders,
        })
        .then(() => {
          alert("Order placed successfully!");
        })
        .catch((err) => console.log(err));
      try {
        axios.get("http://localhost:4006/total/1").then((res) => {
          const currenttotal = res.data.totalsales;
          const newsale = Number(currenttotal) + Number(total);
          return axios.patch(`http://localhost:4006/total/1`, {
            totalsales: newsale,
          });
        });
      } catch (err) {
        console.log(err.message);
      }

      navigate("/profile");
    } else {
      seterror("Enter valid details");
    }
  }

  return (
    <div className="checkout">
      <h1 className="checkout-title">Checkout</h1>

      {cartitem.length === 0 ? (
        <p className="empty-checkout">Your cart is empty.</p>
      ) : (
        <div className="checkout-container">
          <div className="checkout-items">
            <h2>Cart Summary</h2>
            {cartitem.map((item) => (
              <div key={item.id} className="checkout-item">
                <div className="item-left">
                  <span className="checkout-item-name">{item.name}</span>
                  <span className="checkout-item-qty">x {item.quantity}</span>
                </div>
                <div className="item-right">₹{item.price * item.quantity}</div>
              </div>
            ))}
            <div className="checkout-total">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="checkout-form">
            <h2>Shipping & Payment</h2>
            {error && <p className="error">{error}</p>}
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Your Name"
              />
            </label>
            <label>
              Address
              <textarea
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Shipping Address"
              />
            </label>
            <label>
              Card Number
              <input
                type="text"
                value={card}
                onChange={(e) => setcard(e.target.value)}
                placeholder="Card Number"
              />
            </label>

            <button className="place-order-btn" onClick={handlebuy}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
