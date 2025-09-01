import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./components/checkout.css";
import { useState } from "react";

export default function Checkout() {
  const[address,setaddress]=useState("");
  const[card,setcard]=useState("");
  const[name,setname]=useState("");
  const[error,seterror]=useState("");
  const location = useLocation();
  const { cartitem, total } = location.state || { cartitem: [], total: 0 };
  const navigate = useNavigate();

  function handlebuy() {
  if(address.length>1&&card.length>1&&name.length>1){
    const user = JSON.parse(localStorage.getItem("user"));

    const updatedorders = [...(user.orders || []), ...cartitem];

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
  }else{
    seterror("Enter valid details")
  }
  }

  return (
    <div className="checkout">
      <h1 className="checkouttitle">Checkout</h1>

      {cartitem.length === 0 ? (
        <p className="emptycheckout">Your cart is empty.</p>
      ) : (
        <>
          <div className="checkoutitems">
            {cartitem.map((item) => (
              <div key={item.id} className="checkoutitem">
                <span className="checkoutitemname">{item.name} </span>
                <span className="checkoutitemquantity">
                  {" "}
                  x{"  "} {item.quantity}
                  {"  "}
                </span>
                <span className="checkoutitemtotal">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="checkoutsummary">
            <h2 className="checkouttotal">Total: ₹{total}</h2>
            <button onClick={handlebuy} className="placeorderbtn">
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
