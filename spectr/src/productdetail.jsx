import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './components/productdetail.css';
import Navbar from "./components/navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Productdetail() {
  const [product, setproduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4006/products/${id}`)
      .then((res) => setproduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(product);
  if (!product) {
    return <h2>Loading product...</h2>;
  }

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
        localStorage.setItem("user", JSON.stringify(updateuser));

        toast("item added to cart",{
          autoClose:500,
          theme:"dark",
          position:"top-right"
        })
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
    <Navbar/>
      <div className="product-detail">
         <img src={product.img} alt={product.name} className="productimg"/>
        <div className="product-info">
        
        <h2 className="productname">{product.name}</h2>
        <p className="productprice">₹{product.price}</p>
        <p className="product-description">{product.description}</p>
        <button onClick={() => handlecart(product)}>Add to Cart</button>
        </div>
       
      </div>
      <ToastContainer/>
    </>
  );
}
