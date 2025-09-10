import axios from "axios";
import React, { useEffect, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import './components/cart.css';
import { Cartcontext } from "./admin/createcontext";
import Navbar from "./components/navbar";


export default function Cart() {
  const{setccontext}=useContext(Cartcontext)
  const [product, setproduct] = useState([]);
  const [cartitem, setcartitems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const usercart = user.cart;
  useEffect(() => {
    axios
      .get("http://localhost:4006/products")
      .then((res) => setproduct(res.data));
  }, []);

  useEffect(() => {
    if (product.length > 0) {
      const cartitems = usercart.map((cartitem) => {
        const prodectdetails = product.find((p) => p.id === cartitem.productid);
        return { ...prodectdetails, quantity: cartitem.quantity || 1 };
      });
      setcartitems(cartitems);
    }
  }, [product]);

  function increment(id) {
    const updatedcart = cartitem.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setcartitems(updatedcart);
    const updateduser = {
      ...user,
      cart: updatedcart.map((item) => ({
        productid: item.id,
        quantity: item.quantity,
      })),
    };
    localStorage.setItem("user", JSON.stringify(updateduser));

    axios
      .patch(`http://localhost:4006/users/${user.id}`, {
        cart: updateduser.cart,
      })
      .catch((err) => console.log(err));
  }

  function decrement(id) {
    const updatedcart = cartitem.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setcartitems(updatedcart);
    const updateduser = {
      ...user,
      cart: updatedcart.map((item) => ({
        productid: item.id,
        quantity: item.quantity,
      })),
    };
    localStorage.setItem("user", JSON.stringify(updateduser));

    axios
      .patch(`http://localhost:4006/users/${user.id}`, {
        cart: updateduser.cart,
      })
      .catch((err) => console.log(err));
  }

  function removeitem(id) {
    const updatedcart = cartitem.filter((item) => item.id !== id);

    setcartitems(updatedcart);
    setccontext(updatedcart);

    const updateduser = {
      ...user,
      cart: updatedcart.map((item) => ({
        productid: item.id,
        quantity: item.quantity,
      })),
    };

    localStorage.setItem("user", JSON.stringify(updateduser));

    axios
      .patch(`http://localhost:4006/users/${user.id}`, {
        cart: updateduser.cart,
      })
      .catch((err) => console.log(err));
  }

  const total = cartitem.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const navigate = useNavigate();

  function direct() {
    navigate("/checkout", { state: { cartitem, total } });
  }

  return (
    <>
    <Navbar/>
    <div className="cart">
      <h1 className="carttitle">Your Cart</h1>

      {cartitem.length === 0 ? (
        <p className="emptycart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cartitems">
            {cartitem.map((item) => (
              <div key={item.id} className="cartitem">
                <img src={item.img} alt={item.name} className="cartitemimage" />
                <div className="cartitemdetails">
                  <h3 className="cartitemname">{item.name}</h3>
                  <p className="cartitemprice">Price: ₹{item.price}</p>
                  <div className="cartitemquantity">
                    <button
                      onClick={() => decrement(item.id)}
                      className="quantitybtn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.id)}
                      className="quantitybtn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeitem(item.id)}
                    className="removebtn"
                  >
                    Remove item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cartsummary">
            <h2 className="carttotal">Total: ₹{total}</h2>
            <button onClick={direct} className="checkoutbtn">
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
}
