import React from "react";
import { Wishlistcontext } from "./admin/createcontext";
import { useContext } from "react";
import "./components/whishlist.css";
import Navbar from "./components/navbar";
import { Cartcontext } from "./admin/createcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Wishlist() {
  const { setccontext } = useContext(Cartcontext);
  const { wcontext, setwcontext } = useContext(Wishlistcontext);
  console.log(wcontext);

  function handlecart(item) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("please login");
      return;
    }
    const cart = user.cart || [];
    const itemexist = cart.find((cartitem) => cartitem.productid === item.id);
    let updatedcart;
    if (itemexist) {
      updatedcart = cart.map((cartitem) =>
        cartitem.productid === item.id
          ? { ...cartitem, quantity: cartitem.quantity + 1 }
          : cartitem
      );
    } else {
      updatedcart = [...cart, { productid: item.id, quantity: 1 }];
    }

    axios
      .patch(`http://localhost:4006/users/${user.id}`, { cart: updatedcart })
      .then((res) => {
        const updateuser = { ...user, cart: res.data.cart };
        setccontext(res.data.cart);
        localStorage.setItem("user", JSON.stringify(updateuser));

        toast("item added to cart", {
          autoClose: 500,
          theme: "dark",
          position: "top-right",
        });
      })
      .catch((err) => console.log(err));
  }

  function handleRemove(item) {
    const user = JSON.parse(localStorage.getItem("user"));

    const updatedWishlist = wcontext.filter((witem) => witem.id !== item.id);

    axios
      .patch(`http://localhost:4006/users/${user.id}`, {
        wishlist: updatedWishlist,
      })
      .then((res) => {
        const updateuser = { ...user, wishlist: res.data.wishlist };
        localStorage.setItem("user", JSON.stringify(updateuser));
        setwcontext(res.data.wishlist);

        toast("Item removed from wishlist", {
          autoClose: 500,
          theme: "dark",
          position: "top-right",
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar />

      <div className="wishlist">
        <h1 className="wishlist-title">My Wishlist</h1>
        {wcontext.length === 0 ? (
          <p className="empty-wishlist">Your wishlist is empty.</p>
        ) : (
          <div className="wishlist-container">
            {wcontext.map((item) => (
              <div key={item.id} className="wishlist-card">
                <img src={item.img} alt={item.name} className="wishlist-img" />
                <h2 className="wishlist-name">{item.name}</h2>
                <p className="wishlist-brand">{item.brand}</p>
                <p className="wishlist-price">₹{item.price}</p>
                <div style={{ display: "flex", gap: "8px",justifyContent:"center" }}>
                  <button
                    style={{
                      backgroundColor: "#e9e9e9ff",
                      color: "#000000ff",
                      fontFamily: "Michroma",
                      borderRadius: "25px",
                      border: "none",
                      padding: "7px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "0.7rem",
                    }}
                    onClick={() => handlecart(item)}
                  >
                    Add to cart
                  </button>

                  <button
                    style={{
                      backgroundColor: "#f33838ff",
                      color: "#ffffffff",
                      fontFamily: "Michroma",
                      borderRadius: "25px",
                      border: "none",
                      padding: "7px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "0.7rem",
                    }}
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
